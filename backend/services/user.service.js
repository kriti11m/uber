const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname ||  !email || !password){
        throw new Error('All fields are required');
    }
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    
    const user = userModel.create({
        fullname:{
            firstname,
            lastname,
        },
        email,
        password,
    })
    return user;
}