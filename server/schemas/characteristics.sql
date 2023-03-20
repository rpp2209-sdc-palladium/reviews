CREATE TABLE characteristics (
  id SERIAL,
  product_id BIGINT NOT NULL,
  name_ VARCHAR NOT NULL
);

copy characteristics
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/characteristics.csv'
delimiter ',' header csv;