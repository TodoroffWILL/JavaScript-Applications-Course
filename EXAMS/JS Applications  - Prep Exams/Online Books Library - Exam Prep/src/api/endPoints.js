import * as api from './api.js'; // Here we are importing all the fetch functions from the api

const endpoints = {
  // recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
  all: '/data/books?sortBy=_createdOn%20desc',
  create: '/data/books',
  byId: '/data/books/', //          ----- TO DO: CHANGE TO THE RIGHT API ! -------
  deleteById: '/data/books/',
  update: '/data/books/',
};

export async function getRecent() {
  return api.get(endpoints.recent);
}

export async function getAll() {
  return api.get(endpoints.all);
}

export async function create(data) {
  return api.post(endpoints.create, data);
}

export async function getById(id) {
  return api.get(endpoints.byId + id);
}

export async function deleteById(id) {
  return api.del(endpoints.deleteById + id);
}

export async function update(id, data) {
  return api.put(endpoints.update + id, data);
}

export async function getMyBooks(userId) {
  return api.get(
    `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function getLikes(bookId) {
  return api.get(
    `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`
  );
}
export async function postLike(data) {
  return api.post('/data/likes', data);
}

export async function userLikes(bookId,userId){
  return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}