const express = require("express");
const Audio = require("../models/audio");
const verifyToken = require("../middleware/verifyToken");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const audioRoutes = express.Router();
const checkProfileLevel = require("../middleware/checkProfileLevel");


const s3 = new S3Client({
  region: process.env.aws_bucket_region, 
  credentials: {
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key,
  },
});


const upload = multer({
  storage: multer.memoryStorage(),
});

audioRoutes.get("/:_id", verifyToken, checkProfileLevel, async (req, res) => {
  const { _id } = req.params;
  try {
    const audio = await Audio.findById(_id);

    if (!audio) {
      console.error("No such Audio");
      return res.status(404).send("Audio not found");
    }

    res.status(200).json({
      title: audio.title,
      category: audio.category,
      tags: audio.tags,
      level: audio.level,
      content: audio.content,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

audioRoutes.get("/", verifyToken, checkProfileLevel, async (req, res) => {
  try {
    // Fetch all audios from the database
    const audios = await Audio.find();
    res.status(200).send(audios);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

audioRoutes.post(
  "/registerAudio",
  verifyToken,
  checkProfileLevel,
  upload.fields([{ name: "audio" }, { name: "image" }]),
  async (req, res) => {
    const { title, topic,category, categoryPic, tags, level, subType, image, backgroundColor } =
      req.body;
    const audioFile = req.files["audio"][0];
    const imageFile = req.files["image"][0];

    try {
      // Generate a unique key for the audio in the S3 bucket
      const key = `${uuidv4()}-${audioFile.originalname}`;
      const imageBlob = imageFile.buffer.toString("base64");

      // Upload the audio file to the S3 bucket
      const uploadParams = {
        Bucket: "audios-emotionally", // Replace with your S3 bucket name
        Key: key,
        Body: audioFile.buffer,
        ContentType: audioFile.mimetype,
      };

      await s3.send(new PutObjectCommand(uploadParams));

      // Get the URL of the uploaded audio in S3
      const audioUrll = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`; // Replace with your S3 bucket URL pattern

      const imageMimeType = imageFile.mimetype;
      const imageBuffer = imageFile.buffer;
      const imageDataUrl = `data:${imageMimeType};base64,${imageBuffer.toString(
        "base64"
      )}`;

      // Create a new audio with the audio URL in the 'content' property
      const newAudio = new Audio({
        title,
        category,
        categoryPic,
        topic,
        tags,
        level,
        audioUrl: audioUrll,
        subType,
        likes: [],
        image: imageDataUrl,
        backgroundColor,
      });

      // Save the audio to the database
      await newAudio.save();

      return res.status(201).send("Audio registered successfully");
    } catch (error) {
      console.error("Error registering audio:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

audioRoutes.patch("/:_id", verifyToken, checkProfileLevel, async (req, res) => {
  const { _id } = req.params;
  const updatedData = req.body;

  try {
    // Find the audio by ID
    const audio = await Audio.findById(_id);

    if (!audio) {
      console.error("No such audio");
      return res.status(404).send("Audio not found");
    }

    // Update the article's information with the new data
    Object.assign(audio, updatedData);

    // Save the updated article to the database
    await audio.save();

    return res.status(200).send("Audio updated successfully");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
});

audioRoutes.patch(
  "/:_id/likes",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { userId } = req.body;

      const audio = await Audio.findById(_id);
      const isLiked = audio.likes.includes(userId); // Check if userId is in the likes array

      if (isLiked) {
        // If the user has already liked the audio, remove the like.
        audio.likes = audio.likes.filter((like) => like !== userId);
      } else {
        // If the user has not liked the audio, add a new like.
        audio.likes.push(userId); // Push the userId as a string
      }

      const updatedAudio = await Audio.findByIdAndUpdate(
        _id,
        { likes: audio.likes },
        { new: true }
      );

      res.status(200).json(updatedAudio);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
);

audioRoutes.delete(
  "/:_id",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {
    const { _id } = req.params;

    try {
      // Find the audio by ID and delete it
      const deletedAudio = await Audio.findByIdAndDelete(_id);

      if (!deletedAudio) {
        console.error("No such audio");
        return res.status(404).send("Audio not found");
      }

      return res.status(200).send("Audio deleted successfully");
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = audioRoutes;
