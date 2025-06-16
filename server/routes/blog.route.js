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
    getBookmarks
} = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes: fetching blogs (Read operations)
router.get('/', getAllBlogs);
router.get('/:id', getBlogsById);
router.get('/filter/tag', getBlogsByTag);

// Private routes: modifying blogs(Create, Update, Delete, Like)
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlogs);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/rate', protect, rateBlog);
router.get('/bookmarks/user', protect, getBookmarks);

module.exports = router;