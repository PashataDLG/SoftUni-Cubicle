const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res) {
    let { username, password } = req.body;
    console.log(username, password);
     
    res.redirect('/auth/login');
})

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

module.exports = router;