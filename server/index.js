const path = require('path');
const express = require('express');
const app = express();
const db = require('./schemas/postgres.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(???))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// just playing around here
app.get('/reviews', (req, res) => {
  console.log('primaryKey', req.body.primaryKey);
  // grab all data from provided primary key
  // cannot access reviews.reviews_data...says there is no relation that exists
  db.query(`SELECT * FROM reviews WHERE id = ${req.body.primaryKey};`)
    .then((results) => {
      console.log('results', results);
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});