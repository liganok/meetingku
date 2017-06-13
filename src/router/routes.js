import {HashRouter, Switch, Route,Link } from 'react-router-dom'
import React from 'react';

import App from '../components/App';
import Login from '../components/Login';
import Header from '../components/Header';

import Agenda from '../components/AgendaList';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="agenda" component={Agenda} />
  </Route>
);