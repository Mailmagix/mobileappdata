const Discussion = require("../models/discussion");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const checkProfileLevel = require("../middleware/checkProfileLevel");
const multer = require('multer');
const multerS3 = require('multer-s3');



const discussionRoutes = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
  });

discussionRoutes.post(
  "/createDiscussion",
  verifyToken,
  checkProfileLevel,
  upload.single("image"),
  async (req, res) => {
    const { doctorName, doctorRole, emotionalType, backgroundColor, category } =
      req.body;
    try {
      const imageFile = req.file;
      const imageBlob = imageFile.buffer.toString("base64");
      const imageMimeType = imageFile.mimetype;
      const imageBuffer = imageFile.buffer;
      const imageDataUrl = `data:${imageMimeType};base64,${imageBuffer.toString(
        "base64"
      )}`;
      const newDiscussion = new Discussion({
        doctorName,
        doctorRole,
        emotionalType,
        backgroundColor,
        category,
        image: imageDataUrl
      });
      console.log(newDiscussion);
      await newDiscussion.save();
      return res.status(201).send(newDiscussion);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

discussionRoutes.get(
  "/",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {
    try {
        // Fetch all articles from the database
        const discussions = await Discussion.find();
        res.status(200).send(discussions);
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
      }
  }
);

discussionRoutes.put(
  "/:_id",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {}
);

discussionRoutes.delete(
  "/:_id",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {}
);

module.exports = discussionRoutes;
