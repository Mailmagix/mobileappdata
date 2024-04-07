// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors= require('cors');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const audioRoutes = require('./routes/audioRoutes');
const imageRoutes = require('./routes/imageRoutes');
const videoRoutes = require('./routes/videoRoutes');
const utilRoutes = require('./routes/utilRoutes');
const contentRoutes = require('./routes/contentRoutes');
const activityRoutes = require('./routes/activityRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const commitmentRoutes = require('./routes/commitmentRoutes');
const checkInRoutes = require('./routes/checkinRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const toolRoutes = require('./routes/toolRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const tipRoutes = require('./routes/tipRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const journalRoutes = require('./routes/journalRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const topicRoutes = require('./routes/topicRoutes');
const popupRoutes = require('./routes/popupRoutes');
const searchRoutes = require('./routes/searchRoutes');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(env);

// Connect to MongoDB
mongoose.connect('mongodb+srv://pinakiprasadrajkumar:jQDze1CqqUa8ZOht@cluster0.wlg1112.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/users', userRoutes);
app.use('/sessions', userRoutes);
app.use('/articles', articleRoutes);
app.use('/audios', audioRoutes);
app.use('/images', imageRoutes);
app.use('/videos', videoRoutes);
app.use('/countries', utilRoutes);
app.use('/images', contentRoutes);
app.use('/videos', contentRoutes);
app.use('/content', contentRoutes);
app.use('/activity', activityRoutes);
app.use('/users', activityRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/commitments', commitmentRoutes);
app.use('/checkins', checkInRoutes);
app.use('/assessments', assessmentRoutes);
app.use('/tools', toolRoutes);
app.use('/quotes', quoteRoutes);
app.use('/tips', tipRoutes);
app.use('/notifications', notificationRoutes);
app.use('/journals', journalRoutes);
app.use('/discussions', discussionRoutes);
app.use('/topics', topicRoutes);
app.use('/popups', popupRoutes);
app.use('/search', searchRoutes)

const port = 3452;
app.listen(`${port}`, () => {
  console.log('Server listening on port',port);
});
