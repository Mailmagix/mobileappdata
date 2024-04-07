const mongoose = require('mongoose');
const Activity = require('../models/activity');
const Image = require('../models/image'); 
const Article = require('../models/article'); 
const Video = require('../models/video'); 
const Audio = require('../models/audio'); 

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  creationDate: {
    type: String,
    default: Date.now,
  },
  mediaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Activity, // Replace 'Activity' with the actual name of the Activity model
  },
});

const Tool = mongoose.model('Tool', toolSchema);

module.exports = Tool;
