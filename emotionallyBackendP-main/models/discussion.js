const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true
  },
  doctorRole: {
    type: String,
    required: true
  },
  emotionalType: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String
  }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
