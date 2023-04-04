const baseURL = 'http://localhost:3030/users';
const save = (user) => {
  if (user) {
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('_id', user._id);
  }
};

export const login = (email, password) => {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((user) => {
      save(user);
      return user;
    });
};

export const isAuthenticated = () => {
  let accessToken = localStorage.getItem('accessToken');
  return Boolean(accessToken);
};

export const getUser = () => {
  let username = localStorage.getItem('username');
  let email = localStorage.getItem('email');
  let user = {
    username,
    email,
  };
  return user;
};

export const logout = () => {
  let accessToken = localStorage.getItem('accessToken');

  return fetch(`${baseURL}/logout`, {
    headers: { 'X-Authorization': accessToken },
  }).then((res) => localStorage.clear());
};

export const register = (email, password, username) => {
  return fetch(`${baseURL}/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
  })
    .then((res) => res.json())
    .then((user) => {
      save(user);
      return user;
    });
};
