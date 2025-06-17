const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport');

// grab all the controller functions related to authentication
const {
    registerUser,
    loginUser,
} = require('../controllers/authController');

const generateToken = require('../utils/generateToken');


router.post('/register', registerUser);
router.post('/login', loginUser);

// google oauth routes
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: 'http://localhost:5173/login?google=fail',
  session: false
}), (req, res) => {
  const token = generateToken(req.user._id); // your JWT token logic
  const user = req.user;

  // Send data via query params (not secure for sensitive data, but OK for redirect-based login flow)
  const redirectUrl = `http://localhost:5173/login?google=success&token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
  res.redirect(redirectUrl);
});


module.exports = router;