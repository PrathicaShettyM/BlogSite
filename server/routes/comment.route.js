const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

const {
    addComment,
    deleteComment,
    getAllComments
} = require('../controllers/commentController');

router.post('/:blogId', protect, addComment);
router.delete('/:commentId', protect, deleteComment);
router.get('/:blogId', protect, getAllComments);

module.exports = router;