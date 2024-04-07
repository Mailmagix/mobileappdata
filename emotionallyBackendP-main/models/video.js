const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
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
  text: String,
  description: {
    type: String,
    required: true
  },
  likes: [String],
  uri: String,
  subType: String
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
