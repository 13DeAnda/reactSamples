var express = require('express');
var router = express.Router();

var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

router.get('/api/test', function(req, res, next) {
  res.send({message: 'this is the message sent'});
});

router.post('/api/message', (req, res, next) => {
  const results = [];
  // Grab data from http request

  const data = req.body.data;
  //Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO chatboard(username, image, message, time) values($1, $2, $3, $4)',
    [data.user, data.image, data.message, data.time]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM chatboard ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
      console.log("this is the end?", results);
    });
  });
  res.send({message: 'it pushed into the database'});
});

router.get('/api/v1/message', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  console.log("tries to connect");
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM chatboard;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      console.log("got a row", row);
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      console("the results", results);
       res.send(json(results));
    });
  });
});

module.exports = router;
