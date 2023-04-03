// require express
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001; // set localhost server port

// connect mongoDB
const db = require('./config/connection');
// connect api routes
const routes = require('./routes');


// tell express to use middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// start server at PORT
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});
