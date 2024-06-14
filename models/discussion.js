const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    text: { type: String, required: true },
    image: { type: String },
    hashTags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    viewCount: { type: Number, default: 0 },
},{
    timestamps:true
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
