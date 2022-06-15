const router = require('express').Router();

const { isEmail } = require('../utils/validators');
const authService = require('../services/authService');
const { sessionName } = require('../config/constants');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', async function (req, res) {
    let { username, password } = req.body;

    try {
        let token = await authService.login(username, password);
        
        if(!token){
            return res.redirect('/404');
        }

        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');   

    } catch (error) {
        console.log(error)
        res.status(400).render('login', { error: error.message });
    }

});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', async function (req, res, next) {
    let { username, password, repeatPassword } = req.body;
    if(!isEmail(username)){
        let error = {
            message: 'Invalid email',
            status: 401,
        };

        return next(error);
    }
    try {
       await authService.register(username, password, repeatPassword);
        
       res.redirect('/auth/login')
    } catch (error) {
        console.log(error.message);
        res.status(401).render('register', {error: error.message});
    }


});

router.get('/logout', async function (req, res) {
    res.clearCookie(sessionName);
    res.redirect('/');
})

module.exports = router;