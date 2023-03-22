const { getReviews } = require('./server/helpers/get_reviews.js');

describe("GET /reviews/", () => {

  it('Should return the data for GET /reviews/ in the correct shape', (done) => {

    var callback = (error, data) => {
      if (error) {
        done(error);
        return;
      }
      try {
        expect(data.product).toBe("71702");
        expect(data.page).toBe(1);
        expect(data.count).toBe(1);
        expect(data.results[0]).toHaveProperty("review_id", 413989);
        expect(data.results[0]).toHaveProperty("rating", 5);
        expect(data.results[0]).toHaveProperty("summary", "Voluptas sit non velit tenetur ut voluptatem quis.");
        expect(data.results[0]).toHaveProperty("recommend", "true");
        expect(data.results[0]).toHaveProperty("response", null);
        expect(data.results[0]).toHaveProperty("body", "Omnis doloremque iure. Eaque fuga dolor corrupti quia id id veniam et magnam. Vero ab iure quod deserunt.");
        expect(data.results[0]).toHaveProperty("date", "2020-08-06T19:11:56.013Z");
        expect(data.results[0]).toHaveProperty("reviewer_name", "Reese_Douglas35");
        expect(data.results[0]).toHaveProperty("helpfulness", 13);
        expect(data.results[0]).toHaveProperty("photos");
        done();
      } catch (error) {
        done(error);
      }
    }

    var page = 1;
    var count = 1;
    var sort = 'relevant';
    var product_id = 71702;

    getReviews(page, count, sort, product_id, callback);
  });
});



