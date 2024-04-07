const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  category: {
    type: String
  },
  image: {
    type: String
  }
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
