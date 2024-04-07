const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const Image = require('../models/image');
const Video = require('../models/video');
const Article = require('../models/article');
const Audio = require('../models/audio');


const contentRoutes = express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');

contentRoutes.get('/', verifyToken , checkProfileLevel, async(req,res)=>{
  
try {
  const { type, category, tags } = req.body;

  if (!type) {
    return res.status(400).json({ message: 'Please provide a valid type in the request body.' });
  }

  let content;

  if (type === 'image') {
    // Display all images
    let query = {};
    if (category) {
      const categoryRegex = new RegExp(category, 'i');
      query.category = { $regex: categoryRegex };
    }
    if (tags && tags.length > 0) {
      const tagsRegex = tags.map(tag => new RegExp(tag, 'i'));
      query.tags = { $in: tagsRegex };
    }

    content = await Image.find(query).exec();
  } else if (type === 'video') {
    // Display all videos
    let query = {};
    if (category) {
      const categoryRegex = new RegExp(category, 'i');
      query.category = { $regex: categoryRegex };
    }
    if (tags && tags.length > 0) {
      const tagsRegex = tags.map(tag => new RegExp(tag, 'i'));
      query.tags = { $in: tagsRegex };
    }

    content = await Video.find(query).exec();
  } 
  else if (type === 'article') {
    // Display all articles
    let query = {};
    if (category) {
      const categoryRegex = new RegExp(category, 'i');
      query.category = { $regex: categoryRegex };
    }
    if (tags && tags.length > 0) {
      const tagsRegex = tags.map(tag => new RegExp(tag, 'i'));
      query.tags = { $in: tagsRegex };
    }

    content = await Article.find(query).exec();
  } else if (type === 'audio') {
    // Display all audios
    let query = {};
    if (category) {
      const categoryRegex = new RegExp(category, 'i');
      query.category = { $regex: categoryRegex };
    }
    if (tags && tags.length > 0) {
      const tagsRegex = tags.map(tag => new RegExp(tag, 'i'));
      query.tags = { $in: tagsRegex };
    }

    content = await Audio.find(query).exec();
  }
  else {
    return res.status(400).json({ message: 'Invalid content type. Only "image","video","article" and "audio" are supported.' });
  }

  return res.json(content);
} catch (error) {
  console.error('Error fetching content:', error);
  return res.status(500).json({ message: 'Internal Server Error' });
}
    });

contentRoutes.get('/drip', verifyToken, checkProfileLevel, async(req,res)=>{
    try {
        const { category, tags } = req.body;
    
        if (!category || !tags || tags.length === 0) {
          return res.status(400).json({ message: 'Please provide valid values for "category" and "tags" in the request body.' });
        }
        
        const categoryRegex = new RegExp(category, 'i');
        const tagsRegex = tags.map(tag => new RegExp(tag, 'i'));

        // Fetch images that match the category and tags
        const imageQuery = {
          category: { $regex: categoryRegex },
          tags: { $in: tagsRegex }
        };
        const images = await Image.find(imageQuery).exec();
    
        // Fetch videos that match the category and tags
        const videoQuery = {
          category: { $regex: categoryRegex },
          tags: { $in: tagsRegex }
        };
        const videos = await Video.find(videoQuery).exec();

         // Fetch articles that match the category and tags
         const articleQuery = {
          category: { $regex: categoryRegex },
          tags: { $in: tagsRegex }
        };
        const articles = await Article.find(imageQuery).exec();
    
        // Fetch audios that match the category and tags
        const audioQuery = {
          category: { $regex: categoryRegex },
          tags: { $in: tagsRegex }
        };
        const audios = await Audio.find(videoQuery).exec();
    
        return res.json({ images, videos, articles, audios });
      } catch (error) {
        console.error('Error fetching content:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    });


module.exports = contentRoutes;