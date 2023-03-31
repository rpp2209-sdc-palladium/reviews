const db = require('../schemas/database_connections/postgres.js');

var postReviews = (details, callback) => {

  // ASSUMING DETAILS.PHOTOS IS AN ARRAY OF PHOTO URLS
  // FOUND SHAPE OF CHARACTERISTICS FROM HARRY'S REVIEWS FEC... {CHAR_ID: CHAR_VALUE}

  var recentReview;

  db.query(`INSERT INTO reviews (product_id, rating, date_, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${details.product_id}, ${details.rating}, ${Date.now()}, '${details.summary}', '${details.body}', '${details.recommend}', false, '${details.name}', '${details.email}', 'null', 0)`)
    .then(() => {
      db.query(`SELECT id FROM reviews WHERE product_id = ${details.product_id} ORDER BY date_ DESC`)
        .then((data) => {
          recentReview = data.rows[0];
          if (details.photos.length) {
            for (var i = 0; i < details.photos.length; i++) {
              db.query(`INSERT INTO reviewsPhotos (review_id, url_) VALUES (${recentReview.id}, '${details.photos[i]}')`);
            }
          }
        })
        .catch((error) => {
          return callback(error);
        })
        .then(() => {
          var values = Object.values(details.characteristics);
          var ids = Object.keys(details.characteristics);
          for (var i = 0; i < ids.length; i++) {
            db.query(`INSERT INTO characteristicsReviews (characteristic_id, review_id, value_) VALUES (${ids[i]}, ${recentReview.id}, ${values[i]})`)
          }
        })
        .catch((error) => {
          return callback(error);
        })
    })
    .catch((error) => {
      return callback(error);
    })
};

module.exports.postReviews = postReviews;