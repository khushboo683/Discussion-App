const Discussion = require('../models/discussion');

exports.createDiscussion = async (req, res) => {
    try {
        const { text, hashTags } = req.body;
        const image = req.file ? req.file.path : null;
        const discussion = new Discussion({ text, hashTags: hashTags.split(','), image, createdBy: req.user._id });
        await discussion.save();
        res.status(201).send(discussion);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Define other discussion operations (updateDiscussion, deleteDiscussion, listDiscussions, searchDiscussions, listDiscussionsByTag) here...
