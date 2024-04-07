const express = require('express');
const Article = require('../models/article');
const Audio = require('../models/audio');
const Image = require('../models/image');
const Journal = require('../models/journal');
const Quote = require('../models/quote');
const Topic = require('../models/topic');
const Video = require('../models/video');
const searchRoutes = express.Router();


searchRoutes.get("/search", async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const articles = await Article.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subtitle: { $regex: keyword, $options: "i" } },
        { articleHeading: { $regex: keyword, $options: "i" } },
        { articleSubHeading: { $regex: keyword, $options: "i" } },
        { articleDescription: { $regex: keyword, $options: "i" } }
      ]
    })

    const audios = await Audio.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } }
      ]
    })

    const images = await Image.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } }
      ]
    });

    const journals = await Journal.find({
      text: { $regex: keyword, $options: 'i' },
    });

    const quotes = await Quote.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
    });


    const videos = await Video.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
        { text: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    

    const searchResults = {
      articles,
      audios,
      images,
      journals,
      quotes,
      videos
    };

    const response = {};
    Object.keys(searchResults).forEach((key) => {
      if (searchResults[key].length > 0) {
        response[key] = searchResults[key];
      }
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during search", details: error.message });
  }
});

searchRoutes.post("/category", async (req, res) => {
  let { category } = req.body;

  
  const categoryRegex = new RegExp(category, 'i');

  try {
    const articleTopics = await Article.find({ category: categoryRegex }, 'topic');
    const audioTopics = await Audio.find({ category: categoryRegex }, 'topic');
    const imageTopics = await Image.find({ category: categoryRegex }, 'topic');
    const quoteTopics = await Quote.find({ category: categoryRegex }, 'topic');
    const videoTopics = await Video.find({ category: categoryRegex }, 'topic');

    
    let allTopics = [
      ...articleTopics.map((article) => article.topic.toLowerCase()),
      ...audioTopics.map((audio) => audio.topic.toLowerCase()),
      ...imageTopics.map((image) => image.topic.toLowerCase()),
      ...quoteTopics.map((quote) => quote.topic.toLowerCase()),
      ...videoTopics.map((video) => video.topic.toLowerCase()),
    ];

   
    allTopics = Array.from(new Set(allTopics));

   
    const uniqueTopics = allTopics.map(topic => {
      const originalTopic = [
        ...articleTopics,
        ...audioTopics,
        ...imageTopics,
        ...quoteTopics,
        ...videoTopics,
      ].find(item => item.topic.toLowerCase() === topic);
      return originalTopic ? originalTopic.topic : null;
    }).filter(topic => topic !== null);

    res.json({ topics: uniqueTopics });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

searchRoutes.post("/topic", async (req, res) => {
  let { topic, category } = req.body;

  const topicRegex = new RegExp(topic, 'i');
  const categoryRegex = new RegExp(category, 'i');

  try {
    const responseData = {};

    const articleData = await Article.find({ topic: topicRegex, category: categoryRegex });
    if (articleData.length > 0) {
      responseData.Articles = articleData;
    }

    const audioData = await Audio.find({ topic: topicRegex, category: categoryRegex });
    if (audioData.length > 0) {
      responseData.Audios = audioData;
    }

    const imageData = await Image.find({ topic: topicRegex, category: categoryRegex });
    if (imageData.length > 0) {
      responseData.Images = imageData;
    }

    const quoteData = await Quote.find({ topic: topicRegex, category: categoryRegex });
    if (quoteData.length > 0) {
      responseData.Quotes = quoteData;
    }

    const videoData = await Video.find({ topic: topicRegex, category: categoryRegex });
    if (videoData.length > 0) {
      responseData.Videos = videoData;
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


searchRoutes.get("/allCategories", async (req, res) => {
  try {
    const articleCategories = await Article.find({}, 'category categoryPic', { collation: { locale: 'en', strength: 2 } });
    const audioCategories = await Audio.find({}, 'category categoryPic', { collation: { locale: 'en', strength: 2 } });
    const imageCategories = await Image.find({}, 'category categoryPic', { collation: { locale: 'en', strength: 2 } });
    const quoteCategories = await Quote.find({}, 'category categoryPic', { collation: { locale: 'en', strength: 2 } });
    const videoCategories = await Video.find({}, 'category categoryPic', { collation: { locale: 'en', strength: 2 } });

    const allCategoriesSet = new Set([
      ...articleCategories.map(category => capitalizeFirstLetter(category.category.toLowerCase())),
      ...audioCategories.map(category => capitalizeFirstLetter(category.category.toLowerCase())),
      ...imageCategories.map(category => capitalizeFirstLetter(category.category.toLowerCase())),
      ...quoteCategories.map(category => capitalizeFirstLetter(category.category.toLowerCase())),
      ...videoCategories.map(category => capitalizeFirstLetter(category.category.toLowerCase())),
    ]);

    const formattedCategories = [...allCategoriesSet].map(category => {
      const foundCategory = [
        ...articleCategories,
        ...audioCategories,
        ...imageCategories,
        ...quoteCategories,
        ...videoCategories,
      ].find(item => capitalizeFirstLetter(item.category.toLowerCase()) === category);
      
      return {
        category: category,
        image: foundCategory ? foundCategory.categoryPic : null
      };
    });

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}








module.exports = searchRoutes;
