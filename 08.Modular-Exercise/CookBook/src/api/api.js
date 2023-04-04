import { clearUserData, getAccessToken } from '../util.js';

const host = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };
  // check user token
  const token = getAccessToken();
  if (token) {
    options.headers['X-Authorization'] = token;
  }
  if (data) {
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(host + url, options);
    if (!res.ok) {
      if (res.status == 403) {
        clearUserData();
      }
      const error = await res.json(); // DONT FORGET TO 'await' THE ERROR SO IT CAN RESOLVE !
      throw new Error(error.message);
    }
    if (res.status == 204) {
      return res;
    } else {
      return res.json(); // Even if we await it here the func will return again promise so it has to be awaited
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}
const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export { get, post, put, del };
