const Quote = require("../models/quote");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const quoteRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


quoteRoutes.post('/registerQuote', verifyToken , checkProfileLevel, async(req,res)=>{
    const {name,title,topic,category,categoryPic,mediaId,activityId} = req.body;
    const currentDate = new Date();
    const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Kolkata',
    };

    const creationDateStr = currentDate.toLocaleString('en-IN', options);
    const creationDate = creationDateStr;
    try{
    const newQuote= new Quote({
        name,
        title,
        topic,
        category,
        categoryPic,
        creationDate,
        mediaId,
        activityId
    });

    await newQuote.save();
    return res.json(newQuote);
}catch(error){
    console.log("Error",error);
}


});

quoteRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const quote = await Quote.findById(req.params._id);
    
        if (!quote) {
          console.error('No such quote');
          return res.status(404).send('quote not found');
        }

        res.status(200).json({
          name: quote.name,
          category: quote.category,
          creationDate: quote.creationDate,
          mediaId: quote.mediaId,
          activityId: quote.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

quoteRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const quote = await Quote.findById(req.params._id);
    
    if (!quote) {
      console.error('No such quote');
      return res.status(404).send('quote not found');
    }
    Object.assign(quote, updatedData);
    await quote.save();
    
    return res.status(200).send('quote updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

quoteRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedQuote = await Quote.findOneAndDelete({ _id });

    if (!deletedQuote) {
      console.error('No such Quote');
      return res.status(404).send('Quote not found');
    }

    return res.status(200).send('Quote deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = quoteRoutes;