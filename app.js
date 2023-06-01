const express = require('express');
const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/checkerdb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));