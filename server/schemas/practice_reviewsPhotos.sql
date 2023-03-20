CREATE TABLE practice_reviewsPhotos (
  id SERIAL,
  review_id BIGINT NOT NULL,
  url_ VARCHAR NOT NULL
);

copy practice_reviewsPhotos
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/practice_reviewsPhotos.csv'
delimiter ',' header csv;