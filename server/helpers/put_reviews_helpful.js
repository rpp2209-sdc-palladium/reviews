const db = require('../schemas/postgres.js');

var putReviewsHelpful = (review_id, callback) => {
  db.query(`UPDATE practice SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`)
    .then((data) => {
      return callback(null);
    })
    .catch((error) => {
      return (error);
    })
};

module.exports.putReviewsHelpful = putReviewsHelpful;