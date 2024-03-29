CREATE TABLE practice (
  id SERIAL,
  product_id BIGINT NOT NULL,
  rating INT NOT NULL,
  date_ VARCHAR NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend VARCHAR (5) NOT NULL,
  reported VARCHAR (5) NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR NOT NULL,
  helpfulness INT NOT NULL
);

copy practice
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/practice_data.csv'
delimiter ',' header csv;