var express = require('express');
var router = express.Router();

var pg = require('pg');
var path = require('path');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

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
});

router.get('/api/message', (req, res, next) => {
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
    const query = client.query('SELECT * FROM chatboard ORDER BY id ASC;');
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

router.post('/api/users', (req, res, next) => {
  var data = req.body;
  var users = 0;
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    client.query('SELECT * FROM users WHERE username=($1);', [data.username], function(err, result){
      if(result.rows.length > 0){
        res.status(304);
        res.send({success: false, data: "username already exist"});
      }
      else{
        client.query('INSERT INTO users(username, image, password) values($1, $2, $3)', [data.username, data.image, data.password]);
        res.send({message: "sucessfully posted"});
      }
    });
  });
});

router.get('/api/users', (req, res, next) => {
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
    const query = client.query('SELECT * FROM users ORDER BY id ASC;');
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
