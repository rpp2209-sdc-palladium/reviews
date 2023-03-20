const db = require('../schemas/postgres.js');

var putReviewsReport = (review_id, callback) => {
  db.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`)
    .then(() => {
      return callback(null);
    })
    .catch((error) => {
      return callback(error);
    })
};

module.exports.putReviewsReport = putReviewsReport;