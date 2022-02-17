const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db-connection');

const port = process.env.HTTP_PORT;

const app = express();
app.use(bodyParser.json());

function isEmailValid(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

app.post('/customer/register', (req, res) => {
  console.info('POST on /customer/register received');
  const email = req.body.data.customer.email.toLowerCase();
  if (isEmailValid(email)) {
    database.saveNewClientEmail(email);
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
