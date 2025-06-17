const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// create an instance of express app (server), enable cors
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Database connection failed: ", error))

const session = require('express-session');
const passport = require('passport');

app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// instantiate all the routes
const authRoute = require('./routes/auth.route');
// const blogRoutes = require('./routes/blog.route');
// const commentRoutes = require('./routes/comment.route');
// const userRoutes = require('./routes/user.route');

// use the routes
app.use('/api/auth', authRoute);

// app.use('/api/blogs', blogRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/user', userRoutes);

// run the express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
