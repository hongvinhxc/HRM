require('dotenv').config()
const mongoose = require('mongoose');
const app = require('./app');
const { initApp } = require('./utils/initApp');
const logger = require('./utils/logger');
const port = process.env.PORT || 5000;
const db_url = process.env.MONGODB_URL || 'mongodb://localhost:27020/hrm';

mongoose.set('useFindAndModify', false);
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  logger.info('Connected to MongoDB');
  initApp()
  app.listen(port, "::", () => {
    logger.info(`Listening to port ${port}`);
  });
});