const mongoose = require('mongoose');
const User = require("../models/user");

const journalSchema = new mongoose.Schema({
  journalCreationDate: {
    type: String
  },
  journalId: String,
  topic: {
    type: String,
    required: true
  },
  content: {
    filename: String, // File name of the media
    contentType: String, // Content type of the media (e.g., image/jpeg, audio/mpeg)
    path: String, // Path to the media file (e.g., URL or file system path)
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  key: String,
  type: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  userId: {
    type: String,
    ref: User, // Replace 'User' with the actual name of the User model
  },
  url: {
    type: String,
  },
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
