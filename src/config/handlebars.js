const handlebars = require('express-handlebars');
const express = require('express');

module.exports = (app) => {
    app.use('/static', express.static('public'));

    app.use(express.urlencoded({ extended: false }));
    app.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');
    app.set('views', './src/views');
};