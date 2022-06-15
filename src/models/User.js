const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRound } = require('../config/constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        validate: /[a-zA-Z0-9]/,
        minlength: 5
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: /[a-zA-Z0-9]/,
        minlength: 8
    },
});

userSchema.virtual('repeatPassword').set(function(value) {
    if(this.password !== value){
        throw new Error('Passwords should match');
    }
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRound)
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;