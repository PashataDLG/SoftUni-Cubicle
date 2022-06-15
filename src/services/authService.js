const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

const User = require('../models/User');
const { saltRounds, secret } = require('../config/constants');

exports.login = async (username, password) => {
    let user = await User.findOne({ username });

    if(!user){
        //TODO:  add message
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        return;
    }

    let result = new Promise((resolve, reject) => {
        jwt.sign( {_id: user._id, username: user.username }, secret, { expiresIn: '14d' }, (err, token) => {
            if(err) {
                return reject(err);
            }          
            resolve(token);
        });
    });

    return result;
};

exports.register = async (username, password, repeatPassword) => {
    if(User.findOne({ username: username})){
        throw new Error('This username is already taken');
    };
    
    let createdUser = await User.create({
        username,
        password,
        repeatPassword
    });

    return createdUser;
};