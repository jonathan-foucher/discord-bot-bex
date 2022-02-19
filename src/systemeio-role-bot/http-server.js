const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db-connection');
const utils = require('../common/utils');
const logger = require('../common/logger');

const port = process.env.HTTP_PORT;

const app = express();
app.use(bodyParser.json());

app.post('/customers/register', (req, res) => {
  logger.info('POST on /customers/register received');
  const email = req.body.data.customer.email.toLowerCase();
  if (utils.isEmailValid(email)) {
    database.saveNewCustomerEmail(email);
  } else {
    logger.error('Email is not valid');
  }
  res.end();
});

const server = app.listen(port, () => {
  logger.info(`Application is listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('Http server closed');
  });
});
