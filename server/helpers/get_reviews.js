const db = require('../schemas/postgres.js');

var getReviews = (page, count, sort, product_id, callback) => {

  var reviewsQuery = [];
  var reviewsPhotosQuery = [];
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id}`)
    .then((data) => {
      console.log('results', data.rows);
      reviewsQuery = data.rows;
      var photos = [];
      for (var i = 0; i < reviewsQuery.length; i++) {
        var photoData = new Promise((resolve, reject) => {
          // for each review, add whether or not it contains images
          db.query(`SELECT * FROM reviewsPhotos WHERE review_id = ${reviewsQuery[i].id}`)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            })
        })
        photos.push(reviewsQuery[i].id, photoData);
      }
      return Promise.all(photos);
    })
    .then((photosData) => {
      // now we have an array of objects representing the images for each review
      console.log('photosData', photosData);
    })
  // if (product_id) {
  //   callback(null, product_id);
  // }
};

module.exports.getReviews = getReviews;

// {
//   "product": "2",
//   "page": 0,
//   "count": 5,
//   "results": [
//     {
//       "review_id": 5,
//       "rating": 3,
//       "summary": "I'm enjoying wearing these shades",
//       "recommend": false,
//       "response": null,
//       "body": "Comfortable and practical.",
//       "date": "2019-04-14T00:00:00.000Z",
//       "reviewer_name": "shortandsweeet",
//       "helpfulness": 5,
//       "photos": [{
//           "id": 1,
//           "url": "urlplaceholder/review_5_photo_number_1.jpg"
//         },
//         {
//           "id": 2,
//           "url": "urlplaceholder/review_5_photo_number_2.jpg"
//         },
//         // ...
//       ]
//     },
//     {
//       "review_id": 3,
//       "rating": 4,
//       "summary": "I am liking these glasses",
//       "recommend": false,
//       "response": "Glad you're enjoying the product!",
//       "body": "They are very dark. But that's good because I'm in very sunny spots",
//       "date": "2019-06-23T00:00:00.000Z",
//       "reviewer_name": "bigbrotherbenjamin",
//       "helpfulness": 5,
//       "photos": [],
//     },
//     // ...
//   ]
// }
