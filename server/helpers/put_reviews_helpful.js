const db = require('../schemas/database_connections/postgres.js');

var putReviewsHelpful = (review_id, callback) => {
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`)
    .then(() => {
      return callback(null);
    })
    .catch((error) => {
      return (error);
    })
};

module.exports.putReviewsHelpful = putReviewsHelpful;