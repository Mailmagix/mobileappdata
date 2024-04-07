const mongoose = require("mongoose");
const express = require("express");
const Popup = require("../models/popup");
const User = require("../models/user");
const popupRoutes = express.Router();
const verifyToken = require("../middleware/verifyToken");

popupRoutes.post("/create", async (req, res) => {
  const { type, question, title, options, answer } = req.body;

  try {
    const newPopup = await Popup.create({
      type,
      question,
      title,
      options,
      answer,
      status: false,
    });

    res
      .status(201)
      .json({ message: "Popup created successfully", popup: newPopup });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not create popup", details: error.message });
  }
});

popupRoutes.get("/", async (req, res) => {
  try {
    const popups = await Popup.find();
    res.status(200).send(popups);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

popupRoutes.get("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const popup = await Popup.findById(_id);

    if (!popup) {
      return res.status(404).json({ error: "Popup not found" });
    }

    res.status(200).json({ popup });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch popup", details: error.message });
  }
});

popupRoutes.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  const { answer, submit, userId } = req.body;

  try {
    let popupData = {};
    let message = '';

    if (submit === true) {
      const popup = await Popup.findById(_id);
      if (!popup) {
        return res.status(404).json({ error: "Popup not found" });
      }
      popupData = {
        popupId: _id,
        question: popup.question,
        title: popup.title,
        answer: answer,
        submit: true,
        modifiedDate: new Date(),
      };

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { popups: popupData } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      message = "Popup data stored in User";
    } else if (submit === false) {
      message = 'Skipped';
    } else {
      return res.status(400).json({ error: "Invalid value for 'submit'" });
    }

    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).json({ error: "Could not update user popups", details: error.message });
  }
});


module.exports = popupRoutes;
