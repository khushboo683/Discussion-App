const express = require('express');
const router = express.Router();
const { createDiscussion, updateDiscussion, deleteDiscussion, listDiscussions, searchDiscussions, listDiscussionsByTag,likeDiscussion } = require('../controller/discussionController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('image'), createDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.get('/', auth,listDiscussions);
router.get('/search/:id',auth, searchDiscussions);
router.get('/searchByTags',auth, listDiscussionsByTag);
router.post('/like/:id',auth,likeDiscussion)

module.exports = router;
