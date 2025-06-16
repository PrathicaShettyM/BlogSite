const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
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
        minLength: 10,
        maxLength: 25
    },
    bookmarkedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);