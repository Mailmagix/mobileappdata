const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address']
  },
  password: {
    type: String,
    required: true,
  },
  currentPassword: String,
  newPassword: String,
  otp: Number,
  status:{
    type: 'String',
    default: 'Unverified'
  },
  mobileNumber: Number,
  gender: String,
  age: Number,
  relationshipStatus: String,
  employmentStatus: String,
  interests: [String],
  hobbies: [String],
  privacy: {
    type: String,
    enum: ['public','private','friends-only'],
    default: 'public'
  },
  country: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    code: {
      type: String
    }
  },
  registrationDate: String,
  subscriptionDate: Date,
  subscriptionStatus: {
    type: String,
    enum: ['Inactive', 'Active', 'Deleted'],
    default: 'Inactive',
  }, 
  lastActiveDate: Date,
  timeSpentOnApp: Number,
  profileLevel: {type: Number,
  default: 2},
  personaId: String,
  journalsId: {
    type: [], 
    default: [], 
  },
  sessionsId: {
    type: String,
    ref: 'Session'
  },
  activitiesId: {
    type: String,
    ref: 'Activity'
  },
  options: {
    type: [], 
    default: [], 
  },
  popups: [
    {
      popupId: {
        type: String,
      },
      question: {
        type: String,
      },
      title:{
        type: String,
      },
      answer: {
        type: [],
      },
      submit:{
        type: Boolean,
      },
      modifiedDate:{
        type: Date,
      }
    },
  ],

});

const User = mongoose.model('User', userSchema);

module.exports = User;

