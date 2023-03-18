const path = require('path');
const express = require('express');
const app = express();
// const db = require('./schemas/postgres.js');
const { getReviewsMeta } = require('./helpers/get_reviews_meta.js');
const { getReviews } = require('./helpers/get_reviews.js');
const { postReviews } = require('./helpers/post_reviews.js');
const { putReviewsHelpful } = require('./helpers/put_reviews_helpful.js');
const { putReviewsReport } = require('./helpers/put_reviews_report.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(???))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /reviews/
// parameters: page, count, sort, product_id
// should NOT include any reported reviews
app.get('/reviews/', (req, res) => {
  var page = req.query.page;
  var count = req.query.count;
  var sort = req.query.sort;
  var product_id = req.query.product_id;

  getReviews(page, count, sort, product_id, (error, data) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.send(data).status(200);
    }
  })
});

// GET /reviews/meta
// parameters: product_id
app.get('/reviews/meta', (req, res) => {
  var product_id = req.query.product_id;

  getReviewsMeta(product_id, (error, data) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.send(data).status(200);
    }
  })
});

// POST /reviews
// parameters: product_id, rating, summary, body, recommend, name, email, photos, characteristics

// PUT /reviews/:review_id/helpful
// parameters: review_id

// PUT /reviews/:review_id/report
// parameters: review_id

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});