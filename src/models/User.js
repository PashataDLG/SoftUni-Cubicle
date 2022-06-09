const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [3, 'Username cannot be lower than three characters']
    },
    password: {
        type: String,
        required: true,
    },

});

const User = mongoose.model('User', userSchema);

module.exports = User;