const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const { sessionName, secret } = require('../config/constants');

const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    let token = req.cookies[sessionName];

    if(token){
        try {
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
        } catch (error) {
            console.log(error);
            return res.redirect('/404');
        }
            
    }

    next();
};

exports.isAuth = async (req, res, next) => {
    if(!req.user){
        return res.redirect('/404');
    };

    next();
}