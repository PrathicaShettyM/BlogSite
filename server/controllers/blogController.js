const Blog = require('../models/Blog');

// Do CRUD operations: Create, Read, Update Delete
// 1. Create Blog
exports.createBlog = async (req, res) => {
    try {
        // grab the blog from the request body: the title, content and tags
        const {title, content, tags} = req.body;
        
        // create blog
        const blog = await Blog.create({title, content, tags, author: user._id });
        res.send(201).json(blog); // blog created successfully
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

// 2. Get all the blogs
exports.getAllBlogs = async (req, res) => {
    try {
        // fetch the blog and associated author
        const blogs = await Blog.find().populate('author', 'username').sort({createdAt: -1});
        res.json(blogs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// 3. Get blogs by id
exports.getBlogsById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params,id).populate('author', 'username');
        if(!blog){
            return res.send(404).json({
                message: 'Blog not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message 
        });
    }
}

// 4. Update the blogs (only by the author)
exports.updateBlog = async (req, res) => {




}

// 5. Delete blogs (only by the author)
exports.deleteBlogs = async (req, res) => {



}

// 6. Like feature
exports.likeBlog = async (req, res) => {

}

// 7. Get blogs based on tags
exports.getBlogsByTag = async (req, res) => {

}