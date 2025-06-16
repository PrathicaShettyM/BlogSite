const express = require('express');
const router = express.Router();

// grab all the controller functions related to authentication
const {
    registerUser,
    loginUser,
    googleLogin
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);

module.exports = router;