const express = require('express');

const bodyParser = require('body-parser');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.post('/data', (req, res) => {
  // TODO manage received POST here
  console.log('POST received');
  console.log(JSON.stringify(req.headers));
  console.log(req.body);
  res.end();
});

app.listen(port, () => {
  console.log(`Application is listening on port ${port}`);
});
