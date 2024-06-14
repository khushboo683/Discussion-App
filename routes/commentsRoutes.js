const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment, likeComment, replyComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:discussionId', auth, createComment);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);
router.post('/:id/like', auth, likeComment);
router.post('/:id/reply', auth, replyComment);

module.exports = router;
