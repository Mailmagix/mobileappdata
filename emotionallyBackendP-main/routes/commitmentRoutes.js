const Commitment = require("../models/committment");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const commitmentRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


commitmentRoutes.post('/registerCommitment', verifyToken , checkProfileLevel, async(req,res)=>{
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
    const newCommitment= new Commitment({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newCommitment.save();
    return res.json(newCommitment);
}catch(error){
    console.log("Error",error);
}


});

commitmentRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const commitment = await Commitment.findById(req.params._id);
    
        if (!commitment) {
          console.error('No such Commitment');
          return res.status(404).send('Commitment not found');
        }

        res.status(200).json({
          name: commitment.name,
          category: commitment.category,
          creationDate: commitment.creationDate,
          mediaId: commitment.mediaId,
          activityId: commitment.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

commitmentRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const commitment = await Commitment.findById(req.params._id);
    
    if (!commitment) {
      console.error('No such commitment');
      return res.status(404).send('commitment not found');
    }
    Object.assign(commitment, updatedData);
    await commitment.save();
    
    return res.status(200).send('commitment updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

commitmentRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedCommitment = await Commitment.findOneAndDelete({ _id });

    if (!deletedCommitment) {
      console.error('No such Commitment');
      return res.status(404).send('Commitment not found');
    }

    return res.status(200).send('Commitment deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = commitmentRoutes;