const db = require('../schemas/postgres.js');

var getReviewsMeta = (product_id, callback) => {
  var characteristicIds = [];
  var characteristicNames = [];
  var resultingData = {
    "product_id": product_id.toString(),
    "ratings": {},
    "recommended": {},
    "characteristics": {},
  }

  db.query(`SELECT rating, recommend FROM reviews WHERE product_id = ${product_id}`)
    .then((data) => {
      for (var i = 0; i < data.rows.length; i++) {
        if (resultingData.ratings[data.rows[i].rating]) {
          resultingData.ratings[data.rows[i].rating]++;
        } else {
          resultingData.ratings[data.rows[i].rating] = 1;
        }
        if (data.rows[i].recommend === 'true' && resultingData.recommended[1] === undefined) {
          resultingData.recommended[1] = 1;
        } else if (data.rows[i].recommend === 'true' && resultingData.recommended[1]) {
          resultingData.recommended[1]++;
        }
        if (data.rows[i].recommend === 'false' && resultingData.recommended[0] === undefined) {
          resultingData.recommended[0] = 1;
        } else if (data.rows[i].recommend === 'false' && resultingData.recommended[0]) {
          resultingData.recommended[0]++;
        }
      }
      return db.query(`SELECT id, name_ FROM characteristics WHERE product_id = ${product_id}`)
    })
    .then((data) => {
      for (var i = 0; i < data.rows.length; i++) {
        resultingData.characteristics[data.rows[i].name_] = { "id": Number(data.rows[i].id) };
        characteristicIds.push(Number(data.rows[i].id));
        characteristicNames.push(data.rows[i].name_);
      }
      var averages = [];
      for (var i = 0; i < characteristicIds.length; i++) {
        var avg = new Promise((resolve, reject) => {
          db.query(`SELECT AVG(value_) FROM characteristicsReviews where characteristic_id = ${characteristicIds[i]}`)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            })
        })
        averages.push(avg);
      }
      return Promise.all(averages);
    })
    .then((averages) => {
      for (var i = 0; i < averages.length; i++) {
        var avg = Number(averages[i].rows[0].avg).toFixed(4).toString();
        var charName = characteristicNames[i];
        resultingData.characteristics[charName]["value"] = avg;
      }
      return callback(null, resultingData);
    })
    .catch((error) => {
      return callback(error);
    })
};

module.exports.getReviewsMeta = getReviewsMeta;
