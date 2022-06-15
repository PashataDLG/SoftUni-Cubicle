const mongoose = require('mongoose');

const cubeSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: /[a-zA-Z0-9]/,
        minlength: 5,
    },
    description: {
        type: String,
        required: true,
        validate: /[a-zA-Z0-9]/, 
        minlength: 20,
        maxLength: 120,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

cubeSchema.path('imageUrl').validate(function () {
    return this.imageUrl.startsWith('http');
}, 'Image url should be a link');

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;