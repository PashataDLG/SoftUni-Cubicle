const router = require('express').Router();

const accessoryService = require('../services/accessoryService');
router.get('/create', function (req, res){
    res.render('accessory/create');
})

router.post('/create', function (req, res){
    accessoryService.createAccessory(req.body);
    res.redirect('/');
})

module.exports = router;