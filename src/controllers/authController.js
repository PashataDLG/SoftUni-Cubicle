const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', function (req, res) {
    res.render('login');
});

const { sessionName } = require('../config/constants');

router.post('/login', async function (req, res) {
    let { username, password } = req.body;

    let token = await authService.login(username, password);
    
    if(!token){
        return res.redirect('/404');
    }
    res.cookie(sessionName, token, { httpOnly: true });
    res.redirect('/');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', async function (req, res) {
    let { username, password, repeatPassword } = req.body;
    let createdUser = await authService.register(username, password, repeatPassword);

   if(createdUser){
       res.redirect('/auth/login');
   } else {
       res.redirect('404');
   }
});

router.get('/logout', async function (req, res) {
    res.clearCookie(sessionName);
    res.redirect('/');
})

module.exports = router;