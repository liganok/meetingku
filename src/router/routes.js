import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from '../containers/App';
import Login from '../containers/Login';
import Header from '../containers/Header';

import Agenda from '../components/AgendaList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="login" component={Login} />
    <Route path="agenda" component={Agenda} />
  </Route>
);