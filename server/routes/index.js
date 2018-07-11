var express = require('express');
var router = express.Router();

var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

router.get('/api/message', function(req, res, next) {
  res.send({message: 'this is the message sent'});
});

router.post('/api/message', (req, res, next) => {
  const results = [];
  // Grab data from http request
  console.log("on the post request", req.body);
  // const data = {text: req.body.message};
  // Get a Postgres client from the connection pool
  // pg.connect(connectionString, (err, client, done) => {
  //   // Handle connection errors
  //   if(err) {
  //     done();
  //     console.log(err);
  //     return res.status(500).json({success: false, data: err});
  //   }
  //   // SQL Query > Insert Data
  //   client.query('INSERT INTO items(text, complete) values($1, $2)',
  //   [data.text, data.complete]);
  //   // SQL Query > Select Data
  //   const query = client.query('SELECT * FROM items ORDER BY id ASC');
  //   // Stream results back one row at a time
  //   query.on('row', (row) => {
  //     results.push(row);
  //   });
  //   // After all data is returned, close connection and return results
  //   query.on('end', () => {
  //     done();
  //     return res.json(results);
  //   });
  // });
  return {message: 'this is the message sent'};
});

router.get('/api/v1/todos', (req, res, next) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

module.exports = router;
