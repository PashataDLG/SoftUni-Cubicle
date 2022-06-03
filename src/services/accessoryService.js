const Accessory = require('../models/Accessory');

exports.createAccessory = function(accessoryData){
    return Accessory.create(accessoryData);
};

exports.getAllAccessories = () => Accessory.find();