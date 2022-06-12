const express = require('express');

const routes = require('./routes');
const { auth } = require('./middleware/authMiddleware');
const { initializeDatabase } = require('./config/database');

const app = express();

require('./config/handlebars')(app);

app.use(auth);
app.use(routes);

initializeDatabase()
  .then(() => {
    app.listen(3300, () => console.log('App is listening on port 3300'));
  }).catch((err) => console.log('Cannot connect to db:', err));