const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes: fetching blogs (Read operations)
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogsById);
router.get('/filter/tag', blogController.getBlogsByTag);

// Private routes: modifying blogs(Create, Update, Delete, Like)
router.post('/', protect, blogController.createBlog);
router.put('/:id', protect, blogController.updateBlog);
router.delete('/:id', protect, blogController.deleteBlogs);
router.post('/:id/like', protect, blogController.toggleLike);

module.exports = router;