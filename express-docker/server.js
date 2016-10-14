const config        = require('./config.json');
const express       = require('express');
const app           = express();
const serverPort    = config.server.port;
const http          = require('http');
const assert        = require('assert');
const cassandra     = require('cassandra-driver');
const bodyParser    = require('body-parser')

/*
  Implement Route Handlers for endpoints:

  POST /logs - Post arbitrary JSON and persist to the data store, recording at minimum, a timestamp
               and any other data you may think relevant to logging - IP, Browser, whatever

  GET /logs - Return the logs from data store. Consider the ability to page results.

*/

//config
  var databaseClient = null

  function client() {
    if ( !databaseClient ){
      databaseClient = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});
    }
    return databaseClient
  }

  // parse application/json
  app.use(bodyParser.text({ type: '*/*' }));


  app.listen(serverPort, () => {
    console.log(`Log API running on ${serverPort}`);
  });



// Routes
  app.post('/logs', function (req, res) {
    console.log("Post Request", JSON.stringify(req.headers))
      client().execute("INSERT INTO logs (body, headers, created_at) VALUES (?, ?, toTimestamp(now()));", [req.body, JSON.stringify(req.headers)], function(err, result) {
        if (err){
          res.status(400).send({ "error" : err });
        }
        var response = JSON.stringify(result);
        res.send(response);
      });

  });

  app.get('/logs', function (req, res) {
    var timeFrom = req.query.from || '2013-08-13 23:59:00+0200';
    var timeTo = req.query.to || '3000-08-13 23:59:00+0200';
    var page = parseInt(req.query.page) || 0;
    var records = parseInt(req.query.records) || 1000;
    var lineBegin = records * page;
    var lineEnd = lineBegin + records;

    client().execute("SELECT * FROM logs WHERE created_at >= '" + timeFrom + "' AND  created_at <= '" + timeTo + "' ALLOW FILTERING;", function(err, result) {
      if (err){
        res.status(400).send({ "error" : err });
      }

      var totalRecords = result.rows.length
      var data = result.rows.slice(lineBegin, lineEnd)

      var response = JSON.stringify({"data" : data, "totalRecords" : result.rows.length, "page" : page, "recordsPerPage" : records, })

      res.send(response);
    });

  });

  app.post('/clear_logs', function (req, res) {
      client().execute("TRUNCATE logs;", function(err, result) {
        if (err){
          res.status(400).send({ "error" : err });
        }
      });
      res.send({ "data" : "Logs cleared" });
  });


