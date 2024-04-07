const express = require('express');
const Article = require('../models/article');
const verifyToken = require('../middleware/verifyToken');
const articleRoutes = express.Router();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const checkProfileLevel = require('../middleware/checkProfileLevel');


const s3 = new S3Client({
  region: process.env.aws_bucket_region,
  credentials: {
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: 5 * 1024 * 1024 // 5MB limit for file uploads
  // }
});



articleRoutes.get('/:_id', verifyToken, checkProfileLevel,async(req,res) => {
    const { _id } = req.params;
    try {
        const article = await Article.findById(_id);
    
        if (!article) {
          console.error('No such Article');
          return res.status(404).send('Article not found');
        }

        res.status(200).json({
          title: article.title,
          category: article.category,
          tags: article.tags,
          level: article.level,
          content: article.content});

    } catch(err) {
        return res.status(400).send(err);
    }
});

articleRoutes.get('/',verifyToken, checkProfileLevel,async (req, res) => {
  try {
    // Fetch all articles from the database
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

articleRoutes.post('/registerArticle', verifyToken,checkProfileLevel,upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
  try {
    const { title, topic, category, categoryPic, subTitle,articleDescription,buttonText,articleSubHeading,articleHeading,buttonBackgroundColor,backgroundColor,duration} = req.body;

    if (req.files) {
      const audioFile = req.files['audio'][0]; 
      const imageFile = req.files['image'][0];
      const key = `${uuidv4()}-${audioFile.originalname}`;
      const imageBlob = imageFile.buffer.toString('base64');
        const putObjectCommand = new PutObjectCommand({
          Bucket: 'articles-emotionally',
          Key: key,
          Body: audioFile.buffer,
          ContentType: audioFile.mimetype // Set the content type for the file
        });
        
        try {
          await s3.send(putObjectCommand);
        } catch (error) {
          console.error('Error uploading file:', error);
          return res.status(500).json({ message: 'Error uploading file to S3.' });
        }
        
        const s3FileUrl = `https://${putObjectCommand.input.Bucket}.s3.amazonaws.com/${putObjectCommand.input.Key}`;
        const imageMimeType = imageFile.mimetype;
        const imageBuffer = imageFile.buffer;
        const imageDataUrl = `data:${imageMimeType};base64,${imageBuffer.toString('base64')}`;
        const newArticle = new Article({
          title,
          topic,
          category,
          categoryPic,
          subTitle,
          duration,
          backgroundColor,
          buttonBackgroundColor,
          image: imageDataUrl,
          articleHeading,
          buttonText,
          articleSubHeading,
          articleDescription,
          audioLink: s3FileUrl
        });
  
      
        await newArticle.save();
  
        return res.json(newArticle);
        
    } else {
    
      const newArticle = new Article({
          title,
          category,
          categoryPic,
          topic,
          subTitle,
          duration,
          backgroundColor,
          buttonText,
          buttonBackgroundColor,
          articleHeading,
          articleSubHeading,
          articleDescription,
      });

    
      await newArticle.save();

      
      return res.json(newArticle);
    }
  } catch (error) {
    console.error('Error registering article:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

articleRoutes.patch('/:_id', verifyToken, checkProfileLevel,async (req, res) => {
    const { _id } = req.params;
    const updatedData = req.body;
  
    try {
      // Find the article by ID
      const article = await Article.findById(_id);
  
      if (!article) {
        console.error('No such article');
        return res.status(404).send('Article not found');
      }
  
      // Update the article's information with the new data
      Object.assign(article, updatedData);
  
      // Save the updated article to the database
      await article.save();
  
      return res.status(200).send('Article updated successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });

  articleRoutes.patch(
    "/:_id/likes",
    verifyToken,
    checkProfileLevel,
    async (req, res) => {
      try {
        const { _id } = req.params;
        const { userId } = req.body;
  
        const article = await Article.findById(_id);
        const isLiked = article.likes.includes(userId); // Check if userId is in the likes array
  
        if (isLiked) {
          // If the user has already liked the article, remove the like.
          article.likes = article.likes.filter((like) => like !== userId);
        } else {
          // If the user has not liked the article, add a new like.
          article.likes.push(userId); // Push the userId as a string
        }
  
        const updatedArticle = await Article.findByIdAndUpdate(
          _id,
          { likes: article.likes },
          { new: true }
        );
  
        res.status(200).json(updatedArticle);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    }
  );  





articleRoutes.delete('/:_id', verifyToken, checkProfileLevel, async (req, res) => {
    const { _id } = req.params;
  
    try {
      // Find the article by ID and delete it
      const deletedArticle = await Article.findByIdAndDelete(_id);
  
      if (!deletedArticle) {
        console.error('No such article');
        return res.status(404).send('Article not found');
      }
  
      return res.status(200).send('Article deleted successfully');
    } catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Internal Server Error');
    }
  });





module.exports = articleRoutes;




