const bcrypt = require('bcrypt');
const User = require('../models/User');

const saltRounds = 10;

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