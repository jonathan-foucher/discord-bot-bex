const express = require('express');

const bodyParser = require('body-parser');

const port = process.env.HTTP_PORT;

const app = express();
app.use(bodyParser.json());

app.post('/data', (req, res) => {
  // TODO manage received POST here
  console.log('POST received');
  console.log(JSON.stringify(req.headers));
  console.log(req.body);
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
