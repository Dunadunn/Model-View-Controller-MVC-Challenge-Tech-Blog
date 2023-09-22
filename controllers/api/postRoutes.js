const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({});
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const singlePostData = await Post.findByPk(req.params.id);
        if (!singlePostData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(singlePostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.userId
        });
        res.json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postUpdate = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!postUpdate) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(postUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postDelete) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(postDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
