// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Video = require("../models/video");
const Audio = require("../models/audio");
const Article = require("../models/article");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const nodemailer = require("nodemailer");
const validateEmail = require("../middleware/validateEmail");
const validatePassword = require("../middleware/validatePassword");
const ip = require("ip");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
require("dotenv").config();
const verifyToken = require("../middleware/verifyToken");
const checkProfileLevel = require("../middleware/checkProfileLevel");

const userRoutes = express.Router();


const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString().substring(0, 4);
};


const sendOtp = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false,
    auth: {
      user: 'nandannandu254@gmail.com',
      pass: 'hbpl hane patw qzqb',
    },
  });

  const mailOptions = {
    from: 'nandannandu254@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `The otp is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Otp  sent successfully');
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw error;
  }
};





userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      // User not found
      return res.status(404).send("User not found");
    }

    if (user.subscriptionStatus === "Deleted") {
      return res
        .status(403)
        .send("Account Deleted. Please contact Admin to access account.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    const userId = user._id;
    console.log("userid", userId);
    if (passwordMatch) {
      try {
        const sessionCount = await Session.countDocuments({ userId });

        // Define the maximum number of allowed sessions
        const maxSessions = 3;
        console.log("session count", sessionCount);

        if (sessionCount >= maxSessions) {
          return res.status(403).send("Maximum session limit reached");
        }

        const token = jwt.sign({ userId: userId }, process.env.secretKey);

        const ipAddress = ip.address();
        

        
        const geo = geoip.lookup(ipAddress);
        const { country, region, city } = geo || {};
        const userAgent = req.headers["user-agent"];
        const uaParser = new UAParser();
        const result = uaParser.setUA(userAgent).getResult();
        const deviceName = result.device.model || result.browser.name;
        

        
        const session = new Session({
          userId: userId,
          token: token,
          // email: email
        });

        
        await session.save();
        user.sessionsId = session._id;
        await user.save();

        return res.status(201).send({
          message: "Session created successfully and Login Successful",
          sessionId: session._id,
          token: token,
          userId: userId,
        });
      } catch (error) {
        console.error("Error creating session:", error);
        return res.status(500).send("Internal Server Error");
      }

      
    } else {
      return res.status(401).send("Invalid password");
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.get("/:_id", checkProfileLevel, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });

    if (!user) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

  
    return res.status(200).send({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
      age: user.age,
      relationshipStatus: user.relationshipStatus,
      employmentStatus: user.employmentStatus,
      interests: user.interests,
      hobbies: user.hobbies,
      country: user.country,
      registrationDate: user.registrationDate,
      subscriptionDate: user.subscriptionDate,
      subscriptionStatus: user.subscriptionStatus,
      lastActiveDate: user.lastActiveDate,
      profileLevel: user.profileLevel,
      activitiesId: user.activitiesId,
      sessionsId: user.sessionsId,
      journalsId: user.journalsId,
      options: user.options,
      popups: user.popups
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.get("/:_id/likes", checkProfileLevel, async (req, res) => {
  const userId = req.params._id;
  try {
    const likedAudios = await Audio.find({ likes: userId });
    const likedVideos = await Video.find({ likes: userId });
    const likedArticles = await Article.find({ likes: userId });

    // Combine and send the results as one response
    const likedItems = {
      audios: likedAudios,
      videos: likedVideos,
      articles: likedArticles,
    };

    res.status(200).json(likedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

userRoutes.post(
  "/register",
  validateEmail,
  validatePassword,
  async (req, res) => {
    const { name, email, password } = req.body;
    let {
      status,
      otp,
      registrationDate,
      subscriptionStatus,
      age,
      mobileNumber,
      gender,
      relationshipStatus,
      employmentStatus,
      interests,
      hobbies,
      subscriptionDate,
      lastActiveDate,
      timeSpentOnApp,
      profileLevel,
      country,
    } = req.body;

    const currentDate = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
    };

    const registrationDateStr = currentDate.toLocaleString("en-IN", options);
    registrationDate = registrationDateStr;

    subscriptionStatus = "Inactive";
    try {
      // Check if the username already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if (existingUser.subscriptionStatus === "Deleted") {
          return res
            .status(409)
            .send("Account deleted. Please contact admin to access account");
        }
        return res.status(409).send("User with the same email already exists");
      }

      const encrypted = await bcrypt.hash(password, 10);
      otp = generateOTP();
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: encrypted,
        registrationDate: registrationDate,
        subscriptionStatus,
        age,
        mobileNumber,
        gender,
        relationshipStatus,
        employmentStatus,
        interests,
        hobbies,
        subscriptionDate,
        subscriptionStatus,
        lastActiveDate,
        timeSpentOnApp,
        profileLevel: 1,
        otp,
        status,
        country,
      });

      // Save the user to the database
      await newUser.save();

      await sendOtp(email, otp);

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

userRoutes.patch("/:_id", checkProfileLevel, async (req, res) => {
  const { _id } = req.params; // Get the user ID from the URL parameter
  const updatedData = req.body;
  // Get the updated data from the request body

  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing Authorization Header" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      // Token not provided
      return res.status(401).send("Unauthorized");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.secretKey);

    // Check if the token is valid
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).send("Invalid token");
    }

    // Token is valid, proceed with updating the user

    // Find the user by ID
    const user = await User.findOne({ _id });

    if (!user) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

    // Update the user's information with the new data
    Object.assign(user, updatedData);

    // Save the updated user to the database
    await user.save();

    return res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("Error occurred:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    }

    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.delete("/:_id", checkProfileLevel, async (req, res) => {
  const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      // Token not provided
      return res.status(401).send("Unauthorized");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.secretKey);

    // Check if the token is valid
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).send("Invalid token");
    }

    // Token is valid, proceed with updating the user

    const deletedUser = await User.findOneAndDelete({ _id });

    if (!deletedUser) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

    return res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error occurred:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    }

    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.put("/:_id", checkProfileLevel,validatePassword, async (req, res) => {
  const { currentPassword, password, ...updatedData } = req.body;

  try {
    const user = await User.findOne({ _id: req.params._id });

    if (!user) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

    // If both currentPassword and newPassword are provided
    if (currentPassword && password) {
      // Verify if the current password matches the stored hash
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordMatch) {
        console.error("Incorrect current password");
        return res.status(400).send("Incorrect current password");
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(password, 10);
      // Update the user's password with the hashed new password
      user.password = hashedNewPassword;
    }

    // Update other fields in the user document
    Object.assign(user, updatedData);

    // Save the updated user document
    await user.save();

    return res.status(200).send("Success");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error:" + error.message);
  }
});


userRoutes.put("/delete/:_id", checkProfileLevel, async (req, res) => {
  const { subscriptionStatus } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params._id },
      { subscriptionStatus: subscriptionStatus },
      { new: true }
    );

    if (!updatedUser) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error:" + error.message);
  }
});


userRoutes.put(
  "/:_id/options",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {
    const { questionIndex, answer } = req.body;
    try {
      const user = await User.findOne({ _id: req.params._id });

      if (!user) {
        console.error("No such user");
        return res.status(404).send("User not found");
      }

      if (!questionIndex && questionIndex !== 0) {
        console.error("Invalid question index");
        return res.status(400).send("Invalid question index");
      }

      if (questionIndex >= 0 && questionIndex <= 2) {
        // Ensure the user has an array to store the answers
        if (!user.options[questionIndex]) {
          user.options[questionIndex] = [];
        }
        user.options[questionIndex] = [];

        // Check if the answer is undefined or its length is zero
        if (answer === undefined || answer.length === 0) {
          user.options[questionIndex].push("No selection");
        } else if (!user.options[questionIndex].includes(answer)) {
          // Check if the answer already exists in the array
          user.options[questionIndex].push(answer);
        }
      } else {
        console.error("Invalid question index");
        return res.status(400).send("Invalid question index");
      }

      await user.save();
      return res.status(200).send("Answer Received");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

userRoutes.post("/verify-otp/:_id", checkProfileLevel, async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.error("No such user email");
      return res.status(404).send("User not found");
    }

    console.log(typeof otp);
    console.log(typeof user.otp);
    // Check if the provided OTP matches the stored OTP
    if (user.otp !== otp) {
      console.error("Invalid OTP");
      return res.status(400).send("Incorrect code. Please try again.");
    }

    // OTP is valid, update the user's status and remove the OTP
    user.status = "Verified";
    user.otp = undefined;
    await user.save();

    return res.status(200).send("OTP verified successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.patch("/access/:_id", checkProfileLevel, async (req, res) => {
  const { _id } = req.params; // Get the user ID from the URL parameter
  const { profileLevel } = req.body;
  try {
    // Find the user by ID
    const user = await User.findOne({ _id });

    if (!user) {
      console.error("No such user");
      return res.status(404).send("User not found");
    }

    // Assign the profile role to the user
    user.profileLevel = profileLevel;

    // Save the updated user to the database
    await user.save();

    return res.status(200).send("Profile level assigned successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.delete("/session/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedSession = await Session.findOneAndDelete({ _id });
    if (!deletedSession) {
      console.error("No such session");
      return res.status(404).send("Session not found");
    }

    return res.status(200).send("Session deleted successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
});

userRoutes.get("/session/:_id", async (req, res) => {
  try {
    console.log(req.params._id);
    const session = await Session.findOne({ _id: req.params._id });
    console.log("sess", session);
    if (!session) {
      return res.status(404).send("No such session");
    }
    return res.status(200).send("session available");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = userRoutes;
