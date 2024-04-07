const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryPic: {
    type: String,
  },
  tags: {
    type: [String],
    default: []
  },
  level: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  likes: [String],
  subType: String,
  image: String,
  backgroundColor: String
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;
