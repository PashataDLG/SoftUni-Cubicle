const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^http?/g,
            message: 'The image URL must start with http/s!'
        }
    },
    description: {
        type: String,
        maxLength: 150,
        required: true,
    },
    cubes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Cube',
        }
    ]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;