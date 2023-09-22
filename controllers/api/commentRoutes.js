const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single comment by ID
router.get('/:id', async (req, res) => {
    try {
        const singleCommentData = await Comment.findByPk(req.params.id);
        if (!singleCommentData) {
            res.status(404).json({ message: 'No comment found with this ID!' });
            return;
        }
        res.json(singleCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.userId
        });
        res.json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentDelete) {
            res.status(404).json({ message: 'No comment found with this ID!' });
            return;
        }
        res.json(commentDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
