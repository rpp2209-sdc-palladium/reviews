CREATE TABLE reviewsPhotos (
  id BIGINT PRIMARY KEY,
  review_id BIGINT NOT NULL,
  url_ VARCHAR NOT NULL
);

copy reviewsPhotos
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/reviews_photos.csv'
delimiter ',' header csv;