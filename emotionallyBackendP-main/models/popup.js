const mongoose = require('mongoose');

const popupSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  submit: {
    type: Boolean,
  },
  options: {
    type: [String],
    default: []
  },
  title: {
    type: String
  },
  question: {
    type: String,
  },
  answer: [String],
  status: Boolean,
});

const Popup = mongoose.model('Popup', popupSchema);

module.exports = Popup;
