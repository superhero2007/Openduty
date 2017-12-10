const express = require('express');
const {headers, port} = require('./config/config');
const api = require('./rest/API');

const app = express();

app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Methods', headers.allowedMethods);
  res.header('Access-Control-Allow-Origin', headers.domains);
  res.header('Access-Control-Allow-Headers', headers.allowHeaders);
  res.header('Cache-Control', headers.maxAge);
  next();
});

api.init(app);

app.listen(port, () => { console.log(`API listening on port ${port}`); });
