const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db-connection');
const utils = require('./utils');

const port = process.env.HTTP_PORT;

const app = express();
app.use(bodyParser.json());

app.post('/customers/register', (req, res) => {
  console.info('POST on /customers/register received');
  const email = req.body.data.customer.email.toLowerCase();
  if (utils.isEmailValid(email)) {
    database.saveNewCustomerEmail(email);
  } else {
    console.error('Email is not valid');
  }
  res.end();
});

const server = app.listen(port, () => {
  console.info(`Application is listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.info('Http server closed');
  });
});
