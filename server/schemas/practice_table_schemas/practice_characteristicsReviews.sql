CREATE TABLE practice_characteristicsReviews (
  id SERIAL,
  characteristic_id BIGINT NOT NULL,
  review_id BIGINT NOT NULL,
  value_ INT NOT NULL
);

copy practice_characteristicsReviews
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/practice_characteristicsReviews.csv'
delimiter ',' header csv;