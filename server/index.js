const path = require('path');
const express = require('express');
const app = express();
const { getReviewsMeta } = require('./helpers/get_reviews_meta.js');
const { getReviews } = require('./helpers/get_reviews.js');
const { postReviews } = require('./helpers/post_reviews.js');
const { putReviewsHelpful } = require('./helpers/put_reviews_helpful.js');
const { putReviewsReport } = require('./helpers/put_reviews_report.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

app.post('/reviews', (req, res) => {

  var details = {
    product_id: req.body.product_id,
    rating: req.body.rating,
    summary: req.body.summary,
    body: req.body.body,
    recommend: req.body.recommend,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos,
    characteristics: req.body.characteristics
  }

  postReviews(details, (error, data) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  })
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  var review_id = req.params.review_id;

  putReviewsHelpful(review_id, (error) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});

app.put('/reviews/:review_id/report', (req, res) => {
  var review_id = req.params.review_id;

  putReviewsReport(review_id, (error) => {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});