const router = require('express').Router();

const accessoryService = require('../services/accessoryService');
router.get('/create', function (req, res){
    res.render('accessory/create');
});

router.post('/create', function (req, res){
    accessoryService.createAccessory(req.body);
    res.redirect('/');
});

router.get('/:id/attach', function (req, res){
    res.render('accessory/attach');
});

module.exports = router;