import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from '../containers/App';
import Home from '../containers/Login';
import Agenda from '../components/AgendaList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home} />
    <Route path="agenda" component={Agenda} />
  </Route>
);