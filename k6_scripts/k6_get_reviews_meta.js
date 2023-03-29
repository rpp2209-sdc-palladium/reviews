import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1,
      maxVUs: 10
    }
  }
};

export default function () {

  var product_id = randomIntBetween(1, 1000011);

  const url = new URL('http://localhost:3030/reviews/meta');

  url.searchParams.append('product_id', product_id);

  http.get(url.toString());
};

// This is a change for experimental purposes