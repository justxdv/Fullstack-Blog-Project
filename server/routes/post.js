const router = require('express').Router();
const Post = require('../models/Post');

// CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({message: 'Failed to create post', error: err});
    }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedPost);
        } catch (err) {
            res.status(500).json({message: 'Failed to update post', error: err});
        } 
    }
        
        else {
            res.status(401).json({message: 'You can only update your own post'});
        }
    
    } catch (error) {
        res.status(500).json({message: 'You can only update your own post', error: err});
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (post.username === req.body.username) {
            try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'Post has been deleted'});
        } catch (err) {
            res.status(500).json({message: 'Failed to delete post', error: err});
        } 
    }
        
        else {
            res.status(401).json({message: 'You can only delete your own post'});
        }
    
    } catch (error) {
        res.status(500).json({message: 'You can only delete your own post', error: err});
    }
});

// READ ALL POSTS
router.get('/', async (req, res) => {
    const username = req.query.user;
    try{
        let posts;
        if (username) {
            posts = await Post.find({username});
        } 

        else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({message: 'Failed to get posts', error: err});
    }
});

// READ SPECIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({message: 'Failed to get post', error: err});
    }
});


module.exports = router;