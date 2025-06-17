import mongoose from "mongoose"; 

const TAGS_ALLOWED = [
  'education', 'technology', 'lifestyle', 'health', 
  'finance', 'sports', 'travel', 'science'
];

const blogSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        enum: {
            values: TAGS_ALLOWED,
            message: 'Invalid tag provided. Allowed tags are: ' + TAGS_ALLOWED.join(', ')
        },
        default: []
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            value: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            }
        }
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date 
});

export default mongoose.model('Blog', blogSchema);
