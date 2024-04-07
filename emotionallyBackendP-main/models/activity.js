const mongoose = require('mongoose');
const User= require("../models/user");

const activitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  progress: {
    type: Number,
    default: 0,
  },
  actionId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
  },
  userId: {
    type: String,
    // required: true,
    ref: User, // Replace 'User' with the actual name of your User model
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
