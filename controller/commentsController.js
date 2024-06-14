const Comment = require('../models/comments');
const Discussion = require('../models/discussion');

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { discussionId } = req.params;
        const comment = new Comment({ text, createdBy: req.user._id });
        await comment.save();

        const discussion = await Discussion.findById(discussionId);
        discussion.comments.push(comment);
        await discussion.save();

        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Define other comment operations (updateComment, deleteComment, likeComment, replyComment) here...
