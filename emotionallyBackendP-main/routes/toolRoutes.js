const Tool = require("../models/tool");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const toolRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


toolRoutes.post('/registerTool', verifyToken , checkProfileLevel, async(req,res)=>{
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
    const newTool= new Tool({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newTool.save();
    return res.json(newTool);
}catch(error){
    console.log("Error",error);
}


});

toolRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const tool = await Tool.findById(req.params._id);
    
        if (!tool) {
          console.error('No such tool');
          return res.status(404).send('tool not found');
        }

        res.status(200).json({
          name: tool.name,
          category: tool.category,
          creationDate: tool.creationDate,
          mediaId: tool.mediaId,
          activityId: tool.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

toolRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const tool = await Tool.findById(req.params._id);
    
    if (!tool) {
      console.error('No such tool');
      return res.status(404).send('tool not found');
    }
    Object.assign(tool, updatedData);
    await tool.save();
    
    return res.status(200).send('tool updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

toolRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedTool = await Tool.findOneAndDelete({ _id });

    if (!deletedTool) {
      console.error('No such Tool');
      return res.status(404).send('Tool not found');
    }

    return res.status(200).send('Tool deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = toolRoutes;