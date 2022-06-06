const Accessory = require('../models/Accessory');

exports.createAccessory = function(accessoryData){
    return Accessory.create(accessoryData);
};

exports.getAllAvailable = (ids) => Accessory.find({_id: {$nin: ids}});

exports.getAllAccessories = () => Accessory.find();