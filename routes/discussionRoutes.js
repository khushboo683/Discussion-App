const express = require('express');
const router = express.Router();
const { createDiscussion, updateDiscussion, deleteDiscussion, listDiscussions, searchDiscussions, listDiscussionsByTag } = require('../controllers/discussionController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('image'), createDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.get('/', listDiscussions);
router.get('/search', searchDiscussions);
router.get('/tags/:tag', listDiscussionsByTag);

module.exports = router;
