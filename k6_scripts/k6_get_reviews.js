import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 3000,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 1,
      maxVUs: 750
    }
  }
};

export default function () {

  var product_id = randomIntBetween(1, 1000011);
  var sort = 'relevant';

  const url = new URL('http://localhost:3030/reviews/');

  url.searchParams.append('product_id', product_id);
  url.searchParams.append('sort', sort);

  http.get(url.toString());
};