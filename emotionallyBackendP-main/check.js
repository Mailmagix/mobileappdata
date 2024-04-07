const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// MongoDB connection string
const uri = 'mongodb://localhost:27017/userDB';

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// User Model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // User not found
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Valid username and password combination
      return res.send('Login successful');
    } else {
      // Invalid password
      return res.status(401).send('Invalid password');
    }
  } catch (err) {
    console.error('Error finding user:', err);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
