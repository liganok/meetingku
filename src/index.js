'use strict';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';

import App from './containers/App';
import './index.css';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="app" component={App} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
