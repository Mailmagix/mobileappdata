const Tip = require("../models/tip");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const tipRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


tipRoutes.post('/registerTip', verifyToken , checkProfileLevel, async(req,res)=>{
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
    const newTip= new Tip({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newTip.save();
    return res.json(newTip);
}catch(error){
    console.log("Error",error);
}


});

tipRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const tip = await Tip.findById(req.params._id);
    
        if (!tip) {
          console.error('No such tip');
          return res.status(404).send('tip not found');
        }

        res.status(200).json({
          name: tip.name,
          category: tip.category,
          creationDate: tip.creationDate,
          mediaId: tip.mediaId,
          activityId: tip.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

tipRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const tip = await Tip.findById(req.params._id);
    
    if (!tip) {
      console.error('No such tip');
      return res.status(404).send('tip not found');
    }
    Object.assign(tip, updatedData);
    await tip.save();
    
    return res.status(200).send('tip updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

tipRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedTip = await Tip.findOneAndDelete({ _id });

    if (!deletedTip) {
      console.error('No such Tip');
      return res.status(404).send('Tip not found');
    }

    return res.status(200).send('Tip deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = tipRoutes;