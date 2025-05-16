const userModel = require('../models/user.model');
const bcrypt=require('bcrypt');
const blackListTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const captainModel=require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    try {
        // Handle case where authorization header might not exist
        let token;
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({error:"Unauthorized - No token provided"});
        }

        // Check if token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({token: token});
        if(isBlackListed){
            return res.status(401).json({error:"Unauthorized - Token has been invalidated"});
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
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
module.exports.authCaptain = async (req, res, next) => {
    try {
        // Debug logging
        console.log("Auth headers:", req.headers.authorization);
        console.log("Auth cookies:", req.cookies);
        
        // Handle case where authorization header might not exist
        let token;
        if (req.cookies.token) {
            token = req.cookies.token;
            console.log("Using token from cookies");
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(" ")[1];
            console.log("Using token from Authorization header");
        }

        if(!token){
            return res.status(401).json({error:"Unauthorized - No token provided"});
        }

        console.log("Token being verified:", token.substring(0, 20) + "...");
        
        // Check if token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({token: token});
        if(isBlackListed){
            return res.status(401).json({error:"Unauthorized - Token has been invalidated"});
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded token:", decoded); // Debug log
        
        // Get captain from database
        const captain = await captainModel.findById(decoded._id);
        console.log("Captain found:", captain ? "Yes" : "No");
        
        if (!captain) {
            return res.status(401).json({error:"Unauthorized - Captain not found"});
        }
        
        // Set captain on request object
        req.user = captain;
        return next();
    } catch(err) {
        console.error("Auth error:", err.message);
        console.error("Auth error details:", err); 
        console.error("JWT_SECRET_KEY (first 3 chars):", process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY.substring(0, 3) : "undefined");
        return res.status(401).json({error: "Unauthorized - Invalid token"});
    }
}
