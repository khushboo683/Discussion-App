const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.createUser = async (req, res) => {
    try {
        console.log("req",req.body)
        const { name, mobileNo, email, password } = req.body;
        let user = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (user) throw createError(400, 'User already exists.');

        user = new User({ name, mobileNo, email, password: bcrypt.hashSync(password, 10) });
        await user.save();
        res.status(201).send("User created successfully!")
    } catch (error) {
        throw createError(500,error);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw createError(400,'Invalid credentials.');

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.send({ token });
    } catch (error) {
       throw createError(500,'Server error');
    }
};

exports.updateUser = async(req,res)=>{
    const{id}=req.params;
    try{
     const updatedUser =await User.findByIdAndUpdate(id,{...req.body},{
        new:true
     })
     res.status(201).send(updatedUser)
    }catch(error){
        throw createError(500,error)
    }
}

exports.deleteUser=async(req,res)=>{
    const{id}=req.params;
    try{
     await User.findByIdAndDelete(id)
     res.status(201).send('Successfully deleted')
    }catch(error){
        throw createError(500,error)
    }
}

exports.listUsers=async(req,res)=>{
    try{
        console.log("here")
        const result= await User.find()
        res.status(201).send(result)
    }catch(error){
        throw createError(500,error)
        }
    
}
exports.searchUser=async(req,res)=>{
    try{
        console.log("body",req.body)
      const {name} = req.body
      console.log("name",name)
      const result = await User.findOne({name:name})
      if(!result)
      throw createError(400,"No user found with that name!")
      res.status(201).send(result)
    }catch(error){
        throw createError(500,error)
    }
}

exports.followUser=async(req,res)=>{
    try{
      const{id}=req.params
      let user = await User.findById(id)
      if(!user)
      throw createError(400,"User doesn't exist")
    user.followers.push(req.user._id)
    user.save()
    await User.findByIdAndUpdate(req.user._id,{
        $push:{
            following:id
        }
    })
    res.status(201).send("Followed successfully!")
    }catch(error){
        throw createError(500,error)
    }
}