const router = require('express').Router();

router.get('/create', function (req, res){
    res.render('accessory/create');
})

router.post('/create', function (req, res){
    
    res.redirect('/');
})

module.exports = router;