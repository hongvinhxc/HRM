const express = require('express');
const cors = require('cors');
const path = require('path');
const httpStatus = require('http-status');

const routes = require('./routes');
const ApiError = require('./utils/ApiError');
const logger = require('./utils/logger');
const { errorConverter, errorHandler } = require('./middlewares/error');

const secretKey = process.env.SECRET_KEY || 'sdfjhkdhfasgdaskjdhasfgja';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      logger.info(" * request " + req.path)
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
  
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
  
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;