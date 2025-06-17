const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
        type: String,
        minlength: 8,
        validate: {
            validator: function (val) {
                return !this.googleId || val; // if google id exits, password is not required
            },
            message: 'Password is required unless using Google login'
        }
    },
    googleId: {
        type: String
    }, // for google login
    location: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
    },
    bookmarkedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);