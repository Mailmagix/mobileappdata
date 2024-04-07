const Assessment = require("../models/assessment");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const assessmentRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');




assessmentRoutes.post('/registerAssessment', verifyToken ,checkProfileLevel, async(req,res)=>{
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
    const newAssessment= new Assessment({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newAssessment.save();
    return res.json(newAssessment);
}catch(error){
    console.log("Error",error);
}


});

assessmentRoutes.get('/:_id', verifyToken , checkProfileLevel,async(req,res)=>{
    try {
        const assessment = await Assessment.findById(req.params._id);
    
        if (!assessment) {
          console.error('No such assessment');
          return res.status(404).send('assessment not found');
        }

        res.status(200).json({
          name: assessment.name,
          category: assessment.category,
          creationDate: assessment.creationDate,
          mediaId: assessment.mediaId,
          activityId: assessment.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

assessmentRoutes.put('/:_id', verifyToken , checkProfileLevel,async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const assessment = await Assessment.findById(req.params._id);
    
    if (!assessment) {
      console.error('No such assessment');
      return res.status(404).send('assessment not found');
    }
    Object.assign(assessment, updatedData);
    await assessment.save();
    
    return res.status(200).send('assessment updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

assessmentRoutes.delete('/:_id', verifyToken , checkProfileLevel,async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedAssessment = await Assessment.findOneAndDelete({ _id });

    if (!deletedAssessment) {
      console.error('No such Assessment');
      return res.status(404).send('Assessment not found');
    }

    return res.status(200).send('Assessment deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = assessmentRoutes;