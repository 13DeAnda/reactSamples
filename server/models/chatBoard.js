const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

const client = new pg.Client(connectionString);
client.connect();

const query = client.query(
  'CREATE TABLE chatboard(id SERIAL PRIMARY KEY, username VARCHAR(20) not null, image VARCHAR(150), message text,  time VARCHAR(30))');
query.on('end', () => { client.end(); });

const query2 = client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(20) not null, image VARCHAR(150))');
query2.on('end', () => { client.end(); });