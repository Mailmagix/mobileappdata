const CheckIn = require("../models/checkIn");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const checkInRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


checkInRoutes.post('/registerCheckIn', verifyToken , checkProfileLevel, async(req,res)=>{
    const {name,category,mediaId,activityId} = req.body;
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
    const newCheckIn= new CheckIn({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newCheckIn.save();
    return res.json(newCheckIn);
}catch(error){
    console.log("Error",error);
}


});

checkInRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const checkIn = await CheckIn.findById(req.params._id);
    
        if (!checkIn) {
          console.error('No such checkIn');
          return res.status(404).send('checkIn not found');
        }

        res.status(200).json({
          name: checkIn.name,
          category: checkIn.category,
          creationDate: checkIn.creationDate,
          mediaId: checkIn.mediaId,
          activityId: checkIn.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

checkInRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const checkIn = await CheckIn.findById(req.params._id);
    
    if (!checkIn) {
      console.error('No such checkIn');
      return res.status(404).send('checkIn not found');
    }
    Object.assign(checkIn, updatedData);
    await checkIn.save();
    
    return res.status(200).send('checkIn updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

checkInRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedCheckIn = await CheckIn.findOneAndDelete({ _id });

    if (!deletedCheckIn) {
      console.error('No such CheckIn');
      return res.status(404).send('CheckIn not found');
    }

    return res.status(200).send('CheckIn deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = checkInRoutes;