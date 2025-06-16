const express = require('express');
const router = express.Router();

const {getUserProfile, updateUserProfile} = require('../controllers/blogController');
const {getUserDashboard} = require('../controllers/dashboardController');
const {protect} = require('../middlewares/authMiddleware');

// Profile routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Dashboard analytics
router.get('/dashboard', protect, getUserDashboard);

module.exports = router;