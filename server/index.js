const path = require('path');
const express = require('express');
const app = express();
const db = require('./schemas/mongo.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(???))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});