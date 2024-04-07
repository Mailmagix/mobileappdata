const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
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
  subTitle: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    required: true
  },
  buttonBackgroundColor: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  articleHeading: {
    type: String
  },
  likes: [String],
  articleSubHeading: {
    type: String
  },
  articleDescription: {
    type: String
  },
  audioLink: {
    type: String
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
