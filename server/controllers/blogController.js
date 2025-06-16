const Blog = require('../models/Blog');
const User = require('../models/User');

// Do CRUD operations: Create, Read, Update Delete
// Then do Ratings, Bookmarks, Likes functionalities

// 1. Create Blog
exports.createBlog = async (req, res) => {
    try {
        // 1. grab the blog from the request body: the title, content and tags
        const {title, content, tags} = req.body;
        
        // 2. create blog
        const blog = await Blog.create({title, content, tags, author: user._id });
        res.send(201).json(blog); // 201: created successfully
    } catch (err) {
        res.status(400).json({
            error: err.message
        }); // 400: Bad request (server cant process or client-side error)
    }
};

// 2. Get all the blogs
exports.getAllBlogs = async (req, res) => {
    try {
        // 1. fetch the blog and associated author
        const blogs = await Blog.find().populate('author', 'username').sort({createdAt: -1});
        res.json(blogs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        }); // 500: Internal server error
    }
};

// 3. Get blogs by id
exports.getBlogsById = async (req, res) => {
    try {
        // 1. find the blogs by id
        const blog = await Blog.findById(req.params,id).populate('author', 'username');
        
        // 2. check if the blog exits
        if(!blog){
            return res.send(404).json({
                message: "Blog not found"
            }); // 404: not found
        }
    } catch (err) {
        res.status(500).json({
            error: err.message 
        }); // 500: Internal server error
    }
}

// 4. Update the blogs (only by the author)
exports.updateBlog = async (req, res) => {
    try {
    // 1. fetch the author
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            res.status(404).json({
                message: "Blog not found"
            }); // 404: Not found
        }
    // 2. check if the user is authorised to update the blog
        if(blog.author.toString() !== req.user._id){
            return res.status(403).json({
                message: "Unauthorised"
            }); // 403: Forbidden/Unauthorised
        }
    
    // 3. Update logic: keep the previous title, content as it is. just see if ur able to get new content/title from req.body
        blog.title = blog.title || req.body.title;
        blog.content = blog.content || req.body.content;
        blog.tags = blog.tags || req.body.tags;
        blog.updatedAt = Date.now();
    
    // 4. save the changes     
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// 5. Delete blogs (only by the author)
exports.deleteBlogs = async (req, res) => {
    try {
        // 1. find the blog
        const blog = await Blog.findById(req.params.id);
        
        // 2. check if the blog exists
        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        // 3. check if the user is authorised to delete the blog
        if(blog.author.toString !== req.user._id){
            return res.status(403).json({
                message: "Unauthorised"
            });
        }

        // 4. delete the blog record
        await blog.deleteOne();
        res.json({
            message: "Blog deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// 6. Like feature
exports.toggleLike = async (req, res) => {
    try {
        // 1. liking a blog is like toggling a switch: toggle to true or false / on or off
        const blog = await Blog.findById(req.params.id);
        // 2. check if the blog exits
        if(!blog){
            return res.status(404).json({
               message: "Blog not found"
            });
        }

        // 3. check the state of the like button
        const alreadyLiked = blog.likes.includes(req.user._id);
        
        // 4. toggle the state
        if(alreadyLiked){ // if already liked: unlike it 
            blog.likes.pull(req.user._id);
        } else { // if not liked yet: like it
            blog.likes.push(req.user._id);
        }

        // 5. save changes
        await blog.save();
        res.json({
            totalLikes: blog.likes.length
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// 7. Get blogs based on tags
exports.getBlogsByTag = async (req, res) => {
    try {
        // grab the tag by querying for it
        const { tag } = req.query;
        // find the blogs based on the tags
        const blogs = await Blog.find({tags: tag}).populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            error: err.message
        });
    }
};

// 8. Ratings (1-5 stars)
exports.rateBlog = async (req, res) => {
    const { value } = req.body;

    // 1. check if the rating is in a valid range
    if(value < 1 && value > 5){
        return res.status(400).json({
            message: "Rating must be on a scale of 1-5"
        }); // 400: Bad request
    }

    // 2. check if the blog exists
    const blog = await Blog.findById(req.params.id);
    if(!blog){
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    // 3. check the status of current rating and also is the person authorised to give rating
    const existingRating = blog.ratings.find(r => r.user.toString() === req.user._id);
    
    // 4. check if u have given rating, u can update the ratings as well
    if(existingRating){
        existingRating.value = value; // update if the rating already exits
    } else {
        blog.ratings.push({
            user: req.user._id, 
            value
        });
    }

    // 5. save it in the DB
    await blog.save();
    
    // 6. calculate avg ratings 
    const avgRating = (
        blog.ratings.reduce((sum, r) => sum + r.value, 0) / blog.ratings.length
    ).toFixed(1);

    res.json({
        message: "Ratings submitted",
        average: avgRating
    });
};

// 9. add/remove Bookmarks
exports.toogleBookmark = async (req, res) => {
    // 1. grab the user and and his blog id
    const user = await Blog.findById(req.user._id);
    const blogId = await req.params.id;

    // 2. check if the blog id exits in DB
    const isBookmarked = user.bookmarkedBlogs.includes(blogId);

    // 3. toogle the bookmark just like 'like' feature
    if(isBookmarked){
        // if the blog is bookmarked, then remove it
        user.bookmarkedBlogs.pull(blogId);
        await user.save();
        return res.json({
            message: "Bookmark is removed"
        });
    } else {
        // if the blog is not bookmarked, then bookmark it
        user.bookmarkedBlogs.push(blogId);
        await user.save();
        return res.json({
            message: "Bookmarked the blog"
        })
    }
};

// 10. display all the bookmarked blogs
exports.getBookmarks = async (req, res) => {
    const user = await Blog.findById(req.user._id).populate('bookmarkedBlogs');
    res.json(user.bookmarkedBlogs);
};

// 11. search and pagenation
exports.getBlogsWithQuery = async (req, res) => {
    try {
        let {page=1, limit=10, author, tags, sortBy} = req.query;
        const query = {};

        // implement pagenation with authors
        if(author){
            const user = await User.findOne({name: new RegExp(author, 'i')});
            if(user){
                query.author = user._id;
            } else {
                return res.json([]);
            }
        }

        // implement pagenation using tags
        if(tags){
            const tagArray = tags.split(',');
            query.tags = {$in: tagArray};
        }

        let sortOptions = {createdAt: -1};
        if(sortBy === 'likes') sortOptions = {likesCount: -1};
        else if(sortBy === 'ratings') sortOptions = {avgRating: -1};

        // write aggregation query
        const blogs = await Blog.aggregate([
            {$match: query},
            {
                $addFields: {
                    likesCount: {$size: "$likes"},
                    avgRating: {$avg: "$ratings.rating"}
                }
            },
            {$sort: sortOptions},
            {$skip : (page-1)*limit},
            {$limit: parseInt(limit)}
        ]);

        res.json(blogs);
    } catch (err) {
        res.status(500).json({
            error: err.message
        }); // 500: internal server error
    }
}