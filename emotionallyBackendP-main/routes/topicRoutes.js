const Topic = require("../models/topic");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const checkProfileLevel = require("../middleware/checkProfileLevel");
const multer = require('multer');
const multerS3 = require('multer-s3');



const topicRoutes = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
  });

topicRoutes.post(
  "/createTopic",
  verifyToken,
  checkProfileLevel,
  upload.single("image"),
  async (req, res) => {
    const { title, type, itemsCount, backgroundColor, category,subType } =
      req.body;
    try {
      console.log('type of image', typeOf(image))
      const imageFile = req.file;
      const imageBlob = imageFile.buffer.toString("base64");
      const imageMimeType = imageFile.mimetype;
      const imageBuffer = imageFile.buffer;
      const imageDataUrl = `data:${imageMimeType};base64,${imageBuffer.toString(
        "base64"
      )}`;
      const newTopic = new Topic({
        title,
        type,
        itemsCount,
        backgroundColor,
        category,
        image: imageDataUrl,
        subType
      });
      await newTopic.save();
      return res.status(201).send(newTopic);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

topicRoutes.get(
  "/",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {
    try {
        // Fetch all articles from the database
        const topics = await Topic.find();
        res.status(200).send(topics);
      } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
      }
  }
);

topicRoutes.put(
  "/:_id",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {}
);

topicRoutes.delete(
  "/:_id",
  verifyToken,
  checkProfileLevel,
  async (req, res) => {}
);

module.exports = topicRoutes;
