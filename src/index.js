const express = require('express');

const routes = require('./routes');
const { auth } = require('./middleware/authMiddleware');
const { initializeDatabase } = require('./config/database');
const { errorHandler } = require('./middleware/errorHandlerMiddleware');

const app = express();

require('./config/handlebars')(app);                               

app.use(auth);
app.use(routes);
app.use(errorHandler);
      
initializeDatabase()
  .then(() => {
    app.listen(3300, () => console.log('App is listening on port 3300'));
  }).catch((err) => console.log('Cannot connect to db:', err));