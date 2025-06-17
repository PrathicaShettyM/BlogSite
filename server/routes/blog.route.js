const express = require('express');
const router = express.Router();

const {
    getAllBlogs,
    getBlogsById,
    getBlogsByTag,
    createBlog,
    updateBlog,
    deleteBlogs,
    toggleLike,
    rateBlog,
    toggleBookmark,
    getBookmarks,
    getBlogsWithQuery,
    getUserProfile,
    updateUserProfile
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes: fetching blogs (Read operations)
router.get('/', getAllBlogs);
router.get('/search', getBlogsWithQuery); // Should be before /:id to avoid conflicts
router.get('/filter/tag', getBlogsByTag);
router.get('/:id', getBlogsById);

// Private routes: modifying blogs(Create, Update, Delete, Like)
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlogs);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/rate', protect, rateBlog);
router.post('/:id/bookmark', protect, toggleBookmark);
router.get('/bookmarks/user', protect, getBookmarks);

// Profile routes
router.get('/profile/user', protect, getUserProfile);
router.put('/profile/user', protect, updateUserProfile);

module.exports = router;