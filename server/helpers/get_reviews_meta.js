const db = require('../schemas/postgres.js');

var getReviewsMeta = (product_id) => {
  var characteristicIds = [];
  var characteristicNames = [];
  var resultingData = {
    "product_id": product_id.toString(),
    "ratings": {},
    "recommended": {},
    "characteristics": {},
  }

  // recommended? is 0 false and 1 true?

  db.query(`SELECT rating FROM reviews WHERE product_id = ${product_id}`)
    .then((data) => {
      for (var i = 0; i < data.rows.length; i++) {
        if (resultingData.ratings[data.rows[i].rating]) {
          resultingData.ratings[data.rows[i].rating]++;
        } else {
          resultingData.ratings[data.rows[i].rating] = 1;
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
          db.query(`select avg(value_) from characteristicsreviews where characteristic_id = ${characteristicIds[i]}`)
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
    })
};

module.exports.getReviewsMeta = getReviewsMeta;





// {
//   "product_id": "2",
//   "ratings": {
//     2: 1,
//     3: 1,
//     4: 2,
//     // ...
//   },
//   "recommended": {
//     0: 5
//     // ...
//   },
//   "characteristics": {
//     "Size": {
//       "id": 14,
//       "value": "4.0000"
//     },
//     "Width": {
//       "id": 15,
//       "value": "3.5000"
//     },
//     "Comfort": {
//       "id": 16,
//       "value": "4.0000"
//     },
//     // ...
// }