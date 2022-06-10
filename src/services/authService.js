const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const User = require('../models/User');

const saltRounds = 10;

exports.login = async (username, password) => {
    let user = await User.findOne({ username });

    if(!user){
        //TODO:  add message
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(isValid){
        return user;
    } else {
        return;
    }
};

exports.register = async (username, password, repeatPassword) => {
    if(password !== repeatPassword){
        return false;
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    return User.create({
        username,
        password: hashedPassword,
    });
};