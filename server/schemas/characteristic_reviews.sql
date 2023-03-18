CREATE TABLE characteristicsReviews (
  id BIGINT PRIMARY KEY,
  characteristic_id BIGINT NOT NULL,
  review_id BIGINT NOT NULL,
  value_ INT NOT NULL
);

copy characteristicsReviews
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/characteristic_reviews.csv'
delimiter ',' header csv;