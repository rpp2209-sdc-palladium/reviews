const db = require('../schemas/postgres.js');

var getReviews = (page, count, sort, product_id, callback) => {

  // for sorting...default is relevant...what does this mean for querying?
  // newest will be most recent
  // helpful will be...over a certain threshold of helpfulness?
  // need to query by page

  if (page === undefined) {
    page = 1;
  }

  if (count === undefined) {
    count = 5;
  }

  var reviewsQuery = [];
  var resultingData = {
    "product": product_id.toString(),
    "page": Number(page),
    "count": Number(count),
    "results": []
  }

  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported = 'false'`)
    .then((data) => {
      console.log(data.rows);
      reviewsQuery = data.rows;
      var photos = [];
      for (var i = 0; i < reviewsQuery.length; i++) {
        var photoData = new Promise((resolve, reject) => {
          db.query(`SELECT * FROM reviewsPhotos WHERE review_id = ${reviewsQuery[i].id}`)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            })
        })
        photos.push(photoData);
      }
      return Promise.all(photos);
    })
    .then((photosData) => {

      for (var i = 0; i < reviewsQuery.length; i++) {
        var response = null;
        if (reviewsQuery[i].response !== 'null') {
          response = reviewsQuery[i].response;
        }
        var date = new Date(Number(reviewsQuery[i].date_)).toISOString();
        var photos = photosData[i].rows;
        resultingData.results.push({
          "review_id": Number(reviewsQuery[i].id),
          "rating": Number(reviewsQuery[i].rating),
          "summary": reviewsQuery[i].summary,
          "recommend": reviewsQuery[i].recommend,
          "response": response,
          "body": reviewsQuery[i].body,
          "date": date,
          "reviewer_name": reviewsQuery[i].reviewer_name,
          "helpfulness": reviewsQuery[i].helpfulness,
          "photos": photos
        })
      }

      return callback(null, resultingData);
    })
    .catch((error) => {
      return callback(error);
    })
};

module.exports.getReviews = getReviews;

