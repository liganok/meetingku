'use strict'

import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:3001/api'

const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
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
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/user/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/user', {user: {username, email, password}}),
  save: user =>
    requests.put('/user', {user})
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Agenda = {
  all: (page,type) =>
    requests.get(`/agenda?type=${type}&${limit(20, page)}`),
  getTemplate: (page,type) =>
    requests.get(`/template?type=${type}&${limit(20, page)}`),
  get: agendaId =>
    requests.get(`/agenda/${agendaId}`),
  update: agenda =>
    requests.put(`/agenda/${agenda.id}`, {agenda: agenda}),
  save: agenda =>
    requests.post('/agenda', {agenda})
}

const Template = {
  all: (page,type) =>
    requests.get(`/agenda?type=${type}&${limit(20, page)}`),
  get: agendaId =>
    requests.get(`/template/${agendaId}`)
}

export default {
  Agenda,
  Auth,
  Template,
  setToken: _token => { token = _token }
}
