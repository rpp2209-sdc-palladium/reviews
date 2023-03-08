CREATE TABLE public.characteristic_reviews_data (
  id BIGINT PRIMARY KEY,
  characteristic_id BIGINT NOT NULL,
  review_id BIGINT NOT NULL,
  value_ INT NOT NULL
);

copy public.characteristic_reviews_data
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/characteristic_reviews.csv'
delimiter ',' header csv;