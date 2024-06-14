const Comment = require('../models/comments');
const Discussion = require('../models/discussion');
const createError = require('http-errors');

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
        throw createError(500,error)
    }
};
exports.updateComment=async(req,res)=>{
    try{
     const{id}=req.params
     const{text} = req.body
    const updatedComment= await Comment.findByIdAndUpdate(id,{text:text},{new:true})
    res.status(201).send(updatedComment)
    }catch(error){
        throw createError(500,error)
    }
}
exports.deleteComment=async(req,res)=>{
    try{
        const{id}=req.params
        const deletedComment=await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            throw createError(404, "No comment exists with that id!");
        }
        
        // Need to remove the comment from the associated discussion also
        const discussion = await Discussion.findOneAndUpdate(
            { comments: id },
            { $pull: { comments: id } },
            { new: true }
        );
        res.status(200).send({ message: "Comment deleted and removed from discussion", discussion });
    }catch(error){
        throw createError(500,error)
    }
}
exports.likeComment=async(req,res)=>{
    try{
      const{id}=req.params
      let comment=await Comment.findById(id)
      if(!comment)
      throw createError(400,"Comment doesn't exists!")
    comment.likes.push(req.user._id)
    await comment.save()
    res.status(201).send(comment)
    }catch(error){
        throw createError(500,error)
    }
}
