const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {
    console.log(req.body);
     
    res.redirect('/auth/login');
})

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', function (req, res) {
    let { username, password } = req.body;
    authService.register(username, password, repeatPassword);
});

module.exports = router;