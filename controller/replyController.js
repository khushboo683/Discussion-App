const Comment = require('../models/comments')
const Reply = require('../models/reply')
const createError = require('http-errors');

exports.createReply=async(req,res)=>{
    try{
        const{commentId}=req.params
        let comment=await Comment.findById(commentId)
        if(!comment)
        throw createError(400,"Comment doesn't exists!")
        const { text } = req.body;
        const reply = await new Reply({ text, createdBy: req.user._id })
        await reply.save()

        comment.replies.push(reply)
        await comment.save()
        res.status(201).send(comment)
    }catch(error){
        throw createError(500,error)
    }
}
exports.likeReply=async(req,res)=>{
    try{
    const {id} = req.params
    let reply = await Reply.findById(id)
    if(!reply){
      throw createError(400,"Reply doesn't exists!")
    }
    reply.likes.push(req.user._id)
    await reply.save()
    res.status(201).send(reply)
    }catch(error){
        throw createError(500,error)
    }
}
