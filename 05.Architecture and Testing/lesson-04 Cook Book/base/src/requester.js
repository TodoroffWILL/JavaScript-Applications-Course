import { getToken } from './auth.js';

const request = (method, url, data) => {
  let options = {};
  let token = getToken();
  if (method != 'GET') {
    options = {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    };
    if (token) {
      options.headers['X-Authorization'] = token;
    }
  }

  return fetch(url, options).then((res) => res.json());
};
// export const get = (url) => request('GET', url);
// Same as above
export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
