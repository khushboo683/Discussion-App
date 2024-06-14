const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReplySchema = new Schema({
    text: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Reply', ReplySchema);
