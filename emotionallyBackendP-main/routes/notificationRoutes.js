const Notification = require("../models/notification");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const notificationRoutes= express.Router();
const checkProfileLevel = require('../middleware/checkProfileLevel');


notificationRoutes.post('/registerNotification', verifyToken , checkProfileLevel, async(req,res)=>{
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
    const newNotification= new Notification({
        name,
        category,
        creationDate,
        mediaId,
        activityId
    });

    await newNotification.save();
    return res.json(newNotification);
}catch(error){
    console.log("Error",error);
}


});

notificationRoutes.get('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    try {
        const notification = await Notification.findById(req.params._id);
    
        if (!notification) {
          console.error('No such notification');
          return res.status(404).send('notification not found');
        }

        res.status(200).json({
          name: notification.name,
          category: notification.category,
          creationDate: notification.creationDate,
          mediaId: notification.mediaId,
          activityId: notification.activityId});

    } catch(err) {
        return res.status(400).send(err);
    }
});

notificationRoutes.put('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const updatedData = req.body;
     
  try {
    const notification = await Notification.findById(req.params._id);
    
    if (!notification) {
      console.error('No such notification');
      return res.status(404).send('notification not found');
    }
    Object.assign(notification, updatedData);
    await notification.save();
    
    return res.status(200).send('notification updated successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});

notificationRoutes.delete('/:_id', verifyToken , checkProfileLevel, async(req,res)=>{
    const { _id } = req.params; // Get the user ID from the URL parameter

  try {
    const deletedNotification = await Notification.findOneAndDelete({ _id });

    if (!deletedNotification) {
      console.error('No such Notification');
      return res.status(404).send('Notification not found');
    }

    return res.status(200).send('Notification deleted successfully');
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = notificationRoutes;