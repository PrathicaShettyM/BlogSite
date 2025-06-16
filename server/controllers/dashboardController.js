const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getUserDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. fetch users blogs
        const blogs = await Blog.find({author: userId});

        // 2. Generate analytics for dashboard
        const stats = await Promise.all(
            blogs.map(async (blog) => {
                const commentCount = await Comment.countDocuments({post: blog._id});
                const bookmarkCount = await User.countDocuments({bookmarkedBlogs: blog._id});
                const avgRating = blog.ratings?.length > 0 ? blog.ratings.reduce((acc, r) => acc + r.ratings, 0)/blog.ratings.length: 0;

                return {
                    blogId: blog._id,
                    title: blog.title,
                    createdAt: blog.createdAt,
                    likes: blog.likes.length,
                    comments: commentCount,
                    bookmarks: bookmarkCount,
                    avgRating: avgRating.toFixed(1)
                };
            })
        );

        res.json({blogStats: stats});
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}