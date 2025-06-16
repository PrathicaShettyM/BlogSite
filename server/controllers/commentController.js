import Comment from "../models/Comment";
import Blog from "../models/Blog";

// This is also a kinda CRUD operation only, but we are dealing only with comments

// 1. add comments: only possible by the comment author
exports.addComment = async (req, res) => {
    
    try {
        // 1. grab the comment and also the associated blog(here take only blogId thts enough) 
        const { content } = req.body;
        const {blogId} = req.params;

        // 2. check if the blog exits
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            }); // 404: not found
        }

        // 3. create and new comment and save it to the DB
        const comment = new Comment({
            post: blogId,
            author: req.user._id,
            content
        });

        await comment.save();
        res.status(201).json(comment); // 201: created successfully
    } catch (err) {
        res.status(500).json({
            error: err.message
        }); // 500: internal server error
    }
};

// 2. delete comments: only by the comment author
exports.deleteComment = async (req, res) => {
    try {
        // 1. grab the comment and check if its exists
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(404).json({
                message: "Comment not found"
            }); // 404: not found
        }

        // 2. now check if the associated blog exists
        const blog = await Blog.findById(comment.post); // bcoz post is a part of comment, which hold the blogId
        const userId = req.user._id.toString();

        // 3. check if the commenter is authorised to delete his comment
        if(comment.author.toString() !== req.user._id){
            return res.status(403).json({
                message: "Unauthorised"
            }); // 403: forbidden
        }

        // once the user is the original commenter and he's logged in delete operation can be performed
        await comment.deleteOne();
        res.json({
            message: "Comment deleted"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        }); // 500: Internal server error
    }
};

// 3. get all the comments for the post: anybody who wants to see all the comments associated with the blog post
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.blogId
        })
        .populate('author', 'name');
        res.json(comments);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


