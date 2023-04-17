import * as api from './api.js'; // Here we are importing all the fetch functions from the api

const endpoints = {
  // recent: '/data/games?sortBy=_createdOn%20desc&distinct=category',
  all: '/data/offers?sortBy=_createdOn%20desc',
  create: '/data/offers',
  byId: '/data/offers/', //  ----- TO DO: CHANGE TO THE RIGHT API ! -------
  deleteById: '/data/offers/',
  update: '/data/offers/',
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

export async function getApplicants(offerId) {
  return api.get(
    `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`
  );
}
export async function apply(offerId){
  return api.post('/data/applications',offerId)
}