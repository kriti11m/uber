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