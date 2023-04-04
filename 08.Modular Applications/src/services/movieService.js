const baseURL = 'http://localhost:3030/data/movies';

export const getAll = () => {
  return fetch(baseURL).then((res) => res.json());
};

export const getOne = (movieId) => {
  return fetch(`${baseURL}/${movieId}`).then((res) => res.json());
};
