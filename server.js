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

// Config
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  app.use(bodyParser.json())

  app.listen(serverPort, () => {
    console.log(`Log API running on ${serverPort}`);
  });



// Routes
  app.get('/', function (req, res) {
    res.send('Hello World!');
  });


  app.post('/create_db', function (req, res) {
    var client = new cassandra.Client({contactPoints: ['cassandra']});

    client.connect(function(e) {

      return client.execute("CREATE KEYSPACE logging_db WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' };", function(e, res) {
        console.log("Error: ", err, "Result: ", result);
      });
    });

    res.send('Created db');
  });

  app.post('/create_table', function (req, res) {
    client = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});

    client.execute("CREATE TABLE IF NOT EXISTS logging_db.logs (event text, PRIMARY KEY (event));", function(err, result) {
      assert.ifError(err);
      console.log("Error: ", err, "Result: ", result);
    });
    res.send('Created table');
  });

  app.post('/get_event', function (req, res) {
    client = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});
    client.execute('SELECT event FROM logs WHERE key=logging_db', ['An Event!'], function(err, result) {
      assert.ifError(err);
      console.log("Error: ", err, "Result: ", result);
    });
    res.send('Created an event');
  });


  app.post('/create_event', function (req, res) {
    client = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});
      client.execute("INSERT INTO logs (event) VALUES ('An Event!');", function(err, result) {
        assert.ifError(err);
        console.log("Error: ", err, "Result: ", result);
      });
    res.send('Created an event');
  });




  app.post('/logs', function (req, res) {
    console.log("POST REQUEST", req.body)


    client = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});
      client.execute("INSERT INTO logs (event) VALUES ('"+ JSON.stringify(req.body) +"');", function(err, result) {
        assert.ifError(err);
        console.log("Error: ", err, "Result: ", result);
      });
    res.send('POSTING TO LOGS');
  });

  app.get('/logs', function (req, res) {
    client = new cassandra.Client({contactPoints: ['cassandra'], keyspace: "logging_db"});
    client.execute('SELECT * FROM logs;', function(err, result) {
      assert.ifError(err);
      console.log(err, result);
    });


    res.send('GETTING');
  });
// }, 30000);











//   var helenus = require('helenus'),
//
//     pool = new helenus.ConnectionPool({
//       hosts      : ['localhost:9160'],
//       keyspace   : 'helenus_test',
//       user       : 'test',
//       password   : 'test1233',
//       timeout    : 30000
//       //cqlVersion : '3.0.0' // specify this if you're using Cassandra 1.1 and want to use CQL 3
//     });
//
// //optionally you can supply the 'getHost' parameter to the connection pool options which will
// // allow you to override the default random host decision
//
// //if you don't listen for error, it will bubble up to `process.uncaughtException`
// //pools act just like connection objects, so you don't have to worry about api
// //differences when using either the pool or the connection
// pool.on('error', function(err){
//   console.error(err.name, err.message);
// });
//
// //makes a connection to the pool, this will return once there is at least one
// //valid connection, other connections may still be pending
// pool.connect(function(err, keyspace){
//   if(err){
//     throw(err);
//   } else {
//     //to use cql, access the pool object once connected
//     //the first argument is the CQL string, the second is an `Array` of items
//     //to interpolate into the format string, the last is the callback
//     //for formatting specific see `http://nodejs.org/docs/latest/api/util.html#util.format`
//     //results is an array of row objects
//
//     pool.cql("SELECT col FROM cf_one WHERE key = ?", ['key123'], function(err, results){
//       console.log(err, results);
//     });
//
//     //NOTE:
//     //- You can always skip quotes around placeholders, they are added automatically.
//     //- In CQL 3 you cannot use placeholders for ColumnFamily names or Column names.
//   }
// });
