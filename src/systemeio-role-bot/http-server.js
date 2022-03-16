const express = require('express');
const bodyParser = require('body-parser');
const database = require('./db-connection');
const utils = require('../common/utils');
const logger = require('../common/logger');

const port = process.env.HTTP_PORT;
const commonCoachingCourseId = parseInt(process.env.COMMON_COACHING_COURSE_ID, 10);

const app = express();
app.use(bodyParser.json());

app.post('/customers/register', (req, res) => {
  logger.info('POST on /customers/register received');
  const courseId =  req.body && req.body.data && req.body.data.course ? req.body.data.course.id : undefined;
  if(commonCoachingCourseId === courseId) {
    const email = req.body.data.contact && req.body.data.contact.email ? req.body.data.contact.email.toLowerCase() : undefined;
    if (utils.isEmailValid(email)) {
      database.saveNewCommonCoachingCustomerEmail(email);
    } else {
      logger.error('Email is not valid : ' + email);
    }
  } else {
    logger.info('Not common coaching course');
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
