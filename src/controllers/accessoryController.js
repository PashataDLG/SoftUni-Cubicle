const router = require('express').Router();

const accessoryService = require('../services/accessoryService');
const cubeService = require('../services/cubeService');

router.get('/create', function (req, res){
    res.render('accessory/create');
});

router.post('/create', function (req, res){
    accessoryService.createAccessory(req.body);
    res.redirect('/');
});

router.get('/:id/attach', async function (req, res){
    const cube = await cubeService.getOne(req.params.id).lean();
    const accessories = await accessoryService.getAllAccessories().lean();
    console.log(accessories)
    res.render('accessory/attach', { cube, accessories });
});

module.exports = router;