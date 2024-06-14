const jwt = require('jsonwebtoken');
const User = require('../models/user');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    
    const token = req.header('Authorization').replace('Bearer ', '')
    console.log("token",token)
    if (!token) throw createError(401,'Access denied. No token provided.');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (ex) {
       throw createError(400,'Invalid token.');
    }
};
