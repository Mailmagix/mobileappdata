const express = require('express');
const Video = require('../models/video');
const verifyToken = require('../middleware/verifyToken');
const {S3Client} = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');

const videoRoutes = express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


const s3 = new S3Client({
  region: process.env.aws_bucket_region,
  credentials: {
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key
  }
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'videos-emotionally', 
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

videoRoutes.get('/:_id', verifyToken, checkProfileLevel, async(req,res) => {
    const { _id } = req.params;
    try {
        const video = await Video.findById(_id);
    
        if (!video) {
          console.error('No such Video');
          return res.status(404).send('Video not found');
        }

        res.status(200).json({
          title: video.title,
          category: video.category,
          tags: video.tags,
          level: video.level,
          content: video.content});

    } catch(err) {
        return res.status(400).send(err);
    }
});

videoRoutes.get('/',verifyToken, checkProfileLevel, async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find();
    res.status(200).send(videos);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

videoRoutes.post('/registerVideo', verifyToken, checkProfileLevel, upload.single('video'), async (req, res) => {
  const { title, topic, category, categoryPic,text,description,subType } = req.body;

  try {
    // Get the URL of the uploaded video in S3
    const videoUrl = req.file.location;
    console.log('Video URL:', videoUrl);

    // Create a new video
    const newVideo = new Video({ title, topic, category, categoryPic,text,description, uri: videoUrl ,subType});

    // Save the article to the database
    await newVideo.save();

    return res.status(201).send('Video registered successfully');
  } catch (error) {
    console.error('Error registering video:', error);
    return res.status(500).send('Internal Server Error');
  }
});

videoRoutes.patch('/:_id', verifyToken, checkProfileLevel, async (req, res) => {
    const { _id } = req.params;
    const updatedData = req.body;
  
    try {
      // Find the image by ID
      const video = await Video.findById(_id);
  
      if (!video) {
        console.error('No such video');
        return res.status(404).send('Video not found');
      }
  
      // Update the image's information with the new data
      Object.assign(video, updatedData);
  
      // Save the updated article to the database
      await video.save();
  
      return res.status(200).send('Video updated successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });

  videoRoutes.patch(
    "/:_id/likes",
    verifyToken,
    checkProfileLevel,
    async (req, res) => {
      try {
        const { _id } = req.params;
        const { userId } = req.body;
  
        const video = await Video.findById(_id);
        const isLiked = video.likes.includes(userId); // Check if userId is in the likes array
  
        if (isLiked) {
          // If the user has already liked the video, remove the like.
          video.likes = video.likes.filter((like) => like !== userId);
        } else {
          // If the user has not liked the video, add a new like.
          video.likes.push(userId); // Push the userId as a string
        }
  
        const updatedVideo = await Video.findByIdAndUpdate(
          _id,
          { likes: video.likes },
          { new: true }
        );
  
        res.status(200).json(updatedVideo);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    }
  );



videoRoutes.delete('/:_id', verifyToken, checkProfileLevel, async (req, res) => {
    const { _id } = req.params;
  
    try {
      // Find the image by ID and delete it
      const deletedVideo = await Image.findByIdAndDelete(_id);
  
      if (!deletedVideo) {
        console.error('No such video');
        return res.status(404).send('Video not found');
      }
  
      return res.status(200).send('Video deleted successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });






module.exports = videoRoutes;