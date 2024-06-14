const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

exports.createUser = async (req, res) => {
    try {
        const { name, mobileNo, email, password } = req.body;
        let user = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (user) throw createError(400, 'User already exists.');

        user = new User({ name, mobileNo, email, password: bcrypt.hashSync(password, 10) });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ token });
    } catch (error) {
        throw createError(500,'Server error');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw createError(400,'Invalid credentials.');

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials.');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    }catch(error){

        }
    
}