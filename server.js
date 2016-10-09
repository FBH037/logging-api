const config        = require('./config.json');
const express       = require('express');

const app = express();
const serverPort = config.server.port;
const http = require('http');
/*
  Implement Route Handlers for endpoints:

  POST /logs - Post arbitrary JSON and persist to the data store, recording at minimum, a timestamp
               and any other data you may think relevant to logging - IP, Browser, whatever

  GET /logs - Return the logs from data store. Consider the ability to page results.

*/
app.listen(serverPort, () => {
  console.log(`Log API running on ${serverPort}`);
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});
//
app.post('/logs', function (req, res) {
  res.send('POSTING');
});

app.get('/logs', function (req, res) {
  res.send('GETTING');
});
