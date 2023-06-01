const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

// Import routes
const authRoutes = require('./routes/auth');
const sitemapRoutes = require('./routes/sitemap');
const paymentsRoutes = require('./routes/payments');
const usersRoutes = require('./routes/users');

// Import the error handling middleware
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/checkerdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sitemap', sitemapRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
