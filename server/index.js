const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// create an instance of express app (server), enable cors
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("Database connection failed: ", error))

// instantiate all the routes
const authRoute = require('./routes/auth.route');
const blogRoutes = require('./routes/blog.route');


// use the routes
app.use('/api/auth', authRoute);
app.use('/api/blogs', blogRoutes);



// run the express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
