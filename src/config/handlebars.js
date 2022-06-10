const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.use('/static', express.static('public'));
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: false }));
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');
};