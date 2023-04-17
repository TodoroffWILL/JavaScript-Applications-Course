import * as api from './api.js'; // Here we are importing all the fetch functions from the api

const endpoints = {
  // recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
  all: '/data/events?sortBy=_createdOn%20desc',
  create: '/data/events',
  byId: '/data/events/', //    ----- TO DO: CHANGE TO THE RIGHT API ! -------
  deleteById: '/data/events/',
  update: '/data/events/',
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
export async function getGoings(eventId) {
  return api.get(
    `/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`
  );
}
export async function postGoing(data) {
  return api.post('/data/going', data);
}

export async function peopleGoing(eventId, userId) {
  return api.get(
    `/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
