const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SDC');

const reviewsPhotosSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  review_id: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const reviewsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  recommend: {
    type: Boolean,
    required: true
  },
  reported: {
    type: Boolean,
    required: true
  },
  reviewer_name: {
    type: String,
    required: true
  },
  reviewer_email: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  helpfulness: {
    type: Number,
    required: true
  }
});

const characteristicReviewsSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  characteristic_id: {
    type: Number,
    required: true
  },
  review_id: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('ReviewsPhotos', reviewsPhotosSchema);
module.exports = mongoose.model('Reviews', reviewsSchema);
module.exports = mongoose.model('CharacteristicReviews', characteristicReviewsSchema);
