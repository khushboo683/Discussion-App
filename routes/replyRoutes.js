const express = require('express');
const router = express.Router();
const { createReply, likeReply } = require('../controller/replyController');
const auth = require('../middleware/auth');

router.post('/:commentId', auth, createReply);
router.post('/:id/like', auth, likeReply);

module.exports = router;
