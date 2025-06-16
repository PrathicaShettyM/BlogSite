const mongoose = require('mongoose');

const TAGS_ALLOWED = ['education', 'technology', 'lifestyle', 'health', 'finance', 'sports', 'travel', 'science'];

const blogSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [
        {
            type: String,
            enum: {
                values: TAGS_ALLOWED,
                message: 'Invalid tag provided, Allowed tags are: ' + TAGS_ALLOWED.join(', ')
            }
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date 
});

export default mongoose.model('Blog', blogSchema);