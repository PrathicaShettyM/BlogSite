const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5012/api/auth/google/callback'
},

async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({googleId: profile.id});
        if(!user){
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                location: 'Needs to be updated',
                bio: 'This also needs to be updated',
            }); 
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
