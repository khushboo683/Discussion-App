const discussion = require('../models/discussion');
const Discussion = require('../models/discussion');
const createError = require('http-errors');

exports.createDiscussion = async (req, res) => {
    try {
        console.log("body",req.body)
        const { text, hashTags } = req.body;
        const image = req.file ? req.file.path : null;
        const discussion = new Discussion({ text, hashTags: hashTags.join(',').split(','), image, createdBy: req.user._id });
        console.log("discussion",discussion)
        await discussion.save();
        res.status(201).send(discussion);
    } catch (error) {
        console.log(error)
        throw createError(500,error)
    }
};
exports.updateDiscussion=async(req,res)=>{
    try{
        const {id} = req.params;
        let discussion = await Discussion.findById(id)
        console.log("discussion update",discussion)
        if(!discussion)
        throw createError(400,"No discussion exists with that id!")
    if(discussion.createdBy!=req.user._id)
    throw createError(400,"You are not authorized to update this discussion")
        const { text, hashTags } = req.body;
        const image = req.file ? req.file.path : null;
        discussion.text = text !== undefined ? text : discussion.text;
        discussion.hashTags = hashTags ? hashTags.join(',').split(',') : discussion.hashTags;
        discussion.image = image || discussion.image;
        console.log("discussion",discussion)
        await discussion.save();
        res.status(201).send(discussion);
    } catch (error) {
        console.log(error)
        throw createError(500,error)
    }
}
exports.deleteDiscussion=async(req,res)=>{
    try{
        const {id} = req.params;
        await Discussion.findByIdAndDelete(id)
        res.status(201).send("Deleted")
    }catch(error){
        throw createError(500,error)
    }
}
exports.listDiscussions=async(req,res)=>{
    try{
     const result = await Discussion.find()
     res.status(201).send(result)
    }catch(error){
        throw createError(500,error)
    }
}
exports.searchDiscussions=async(req,res)=>{
    try{
     const {id}=req.params
     const result = await Discussion.findById(id)
     if(!result)
     throw createError(400,"No discussion to show!")
    res.status(201).send(result)
    }catch(error){
        throw createError(500,error)
    }
}
exports.listDiscussionsByTag = async (req, res) => {
    try {
        const { hashTags } = req.body; // Assuming req.body.tags is an array of tags like ["tag1", "tag2"]
        
        if (!hashTags || !Array.isArray(hashTags) || hashTags.length === 0) {
            throw createError(400, "Tags must be a non-empty array");
        }

        const discussions = await Discussion.find({ hashTags: { $in: hashTags } });
        
        res.status(200).send(discussions);
    } catch (error) {
        console.log(error);
        throw createError(500,error)
    }
};
exports.likeDiscussion=async(req,res)=>{
    try{
        const{id}=req.params
        let discussion = await Discussion.findById(id)
        if(!discussion)
        throw createError(400,"Discussion doesn't exist!")
        discussion.likes.push(req.user._id);
        await discussion.save()
        res.status(201).send(discussion)
    }catch(error){
        throw createError(500,error)
    }
    
}

