const express = require('express');
const Activity = require('../models/activity');
const verifyToken = require('../middleware/verifyToken');
const User= require('../models/user');
const activityRoutes = express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');




activityRoutes.post('/registerActivity',verifyToken,checkProfileLevel, async(req,res)=>{
    const{ activityName, category, progress, actionId} = req.body;
    try{
        
        const user = await User.findOne({_id:req.user.userId});
        if(!user){
            console.log("No Such User");
            return res.status(400).send("No User");
        }

        const uid = user.id;
        console.log("profileLevel:",user.profileLevel);
        
        const newActivity = new Activity({
            activityName,
            category,
            actionId,
            progress,
            userId: uid
        });

        await newActivity.save();
        user.activitiesId = newActivity._id;
        await user.save();
  
        // Return the saved article
        return res.json(newActivity);
    }catch(error){
        console.log("Error",error);
    }



});

activityRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const activity = await Activity.findById(req.params._id);
    
        if (!activity) {
          console.error('No such activity');
          return res.status(404).send('activity not found');
        }

        res.status(200).json({
          name: activity.activityName,
          category: activity.category,
          progress : activity.progress,
          actionId: activity.actionId,
          userId: activity.userId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

activityRoutes.put('/:_id', verifyToken, checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const activity = await Activity.findById(req.params._id);
    
    if (!activity) {
      console.error('No such activity');
      return res.status(404).send('activity not found');
    }
    Object.assign(activity, updatedData);
    await activity.save();
    
    return res.status(200).send('activity updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

activityRoutes.delete('/:_id', verifyToken, checkProfileLevel,async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedActivity = await Activity.findOneAndDelete({ _id });

    if (!deletedActivity) {
      console.error('No such Activity');
      return res.status(404).send('Activity not found');
    }

    return res.status(200).send('Activity deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = activityRoutes;