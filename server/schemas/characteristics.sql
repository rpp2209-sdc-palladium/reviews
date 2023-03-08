CREATE TABLE public.characteristics_data (
  id BIGINT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  name_ VARCHAR NOT NULL
);

copy public.characteristics_data
from '/Users/maddiesime/Documents/HR Sprint Repos/SDC/reviews/data_files/characteristics.csv'
delimiter ',' header csv;