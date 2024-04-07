const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true
  },
  topic: {
    type: String,
    required: true
  },
  category: {
    type: String,
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
    // required: true
  },
  content: {
    type: String,
    // required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
