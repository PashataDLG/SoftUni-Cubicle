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
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:id/attach', async function (req, res){
    const accessoryId = req.body.accessory;
    const cubeId = req.params.id;

    await cubeService.attachAccessory(cubeId, accessoryId)
    res.redirect(`/cube/details/${req.params.id}`);
});

module.exports = router;