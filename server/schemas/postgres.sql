CREATE TABLE IF NOT EXISTS reviews (
  product_id BIGINT NOT NULL,
  rating INT NOT NULL,
  _date BIGINT NOT NULL,
  summary VARCHAR NOT NULL,
  body VARCHAR NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_email VARCHAR NOT NULL,
  response VARCHAR,
  helpfulness INT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  review_id BIGINT NOT NULL,
  _url VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  characteristic_id BIGINT NOT NULL,
  review_id BIGINT NOT NULL,
  _value INT NOT NULL
);