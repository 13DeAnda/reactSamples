const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/chat';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE chatBoard(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });