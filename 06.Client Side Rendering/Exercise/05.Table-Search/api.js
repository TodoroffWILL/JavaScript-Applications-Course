const host = 'http://localhost:3030/';

export async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };
  if (options) {
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${host}${url}`);
    if (!res.ok) {
      throw new Error(res.message);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}
