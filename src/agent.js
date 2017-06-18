'use strict';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3001/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/user/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/user', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Agenda = {
  all: page =>
    requests.get(`/agenda`),
  get: agenda =>
  requests.get(`/agenda/${agenda.id}`),
  update: agenda =>
    requests.put(`/agenda/${agenda.id}`, { agenda: agenda }),
  create: agenda =>
    requests.post('/agenda', { agenda })
};


const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Agenda,
  Auth,
  Profile,
  setToken: _token => { token = _token; }
};
