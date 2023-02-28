const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  name: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});

client.connect((error) => {
  if (error) {
    console.log('Connection error', error);
  } else {
    console.log('Connected to PostgreSQL!');
  }
});

module.exports = client;