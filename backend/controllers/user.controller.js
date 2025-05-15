const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');
module.exports.registerUser = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { fullname: { firstname, lastname }, email, password } = req.body;
    const hashedPassword = await userService.hashPassword(password);
    const user = await userService.createUser({firstname, lastname, email, password:hashedPassword});

    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}

module.exports.getLoginPage = (req, res) => {
    res.status(200).json({ message: "Login page endpoint" });
};

module.exports.getUserProfile = async (req, res) => {
    try {
        
        res.status(200).json({
            success: true,
            profile: req.user
        });
    } catch (error) {
        console.error('Profile retrieval error:', error);
        res.status(500).json({error: "Server error retrieving profile"});
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        const {email, password} = req.body;
        console.log('Login attempt:', email); // Log login attempts
        
        // Check if user exists
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            console.log('User not found:', email);
            return res.status(401).json({error:"Invalid email or password"});
        }
        
        // Verify password
        const isMatch = await user.comparePassword(password);
        console.log('Password match result:', isMatch);
        
        if(!isMatch){
            console.log('Invalid password for user:', email);
            return res.status(401).json({error:"Invalid email or password"});
        }
        
        // Generate token and respond
        const token = user.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({token, user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({error: "Server error during login"});
    }
}
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (token) {
            // Check if token is already blacklisted
            const existingToken = await blackListTokenModel.findOne({ token });
            
            // Only add to blacklist if not already present
            if (!existingToken) {
                await blackListTokenModel.create({ token });
            }
        }
        
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: "Server error during logout" });
    }
}