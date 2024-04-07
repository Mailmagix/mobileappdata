const Exercise = require("../models/exercise");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 


const exerciseRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


exerciseRoutes.post('/registerExercise', verifyToken , checkProfileLevel, async(req,res)=>{
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
    const newExercise= new Exercise({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newExercise.save();
    return res.json(newExercise);
}catch(error){
    console.log("Error",error);
}


});

exerciseRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const exercise = await Exercise.findById(req.params._id);
    
        if (!exercise) {
          console.error('No such Exercise');
          return res.status(404).send('Exercise not found');
        }

        res.status(200).json({
          name: exercise.name,
          category: exercise.category,
          creationDate: exercise.creationDate,
          mediaId: exercise.mediaId,
          activityId: exercise.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

exerciseRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const exercise = await Exercise.findById(req.params._id);
    
    if (!exercise) {
      console.error('No such exercise');
      return res.status(404).send('Exercise not found');
    }
    Object.assign(exercise, updatedData);
    await exercise.save();
    
    return res.status(200).send('Exercise updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

exerciseRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedExercise = await Exercise.findOneAndDelete({ _id });

    if (!deletedExercise) {
      console.error('No such exercise');
      return res.status(404).send('Exercise not found');
    }

    return res.status(200).send('Exercise deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});
















module.exports = exerciseRoutes;