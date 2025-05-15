const userModel = require('../models/user.model');
const bcrypt=require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({error:"Unauthorized"});
        }

        // Check if token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({token: token});
        if(isBlackListed){
            return res.status(401).json({error:"Unauthorized - Token has been invalidated"});
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from database
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({error:"Unauthorized - User not found"});
        }
        
        // Set user on request object
        req.user = user;
        return next();
    } catch(err) {
        console.error("Auth error:", err.message);
        return res.status(401).json({error: "Unauthorized - Invalid token"});
    }
}