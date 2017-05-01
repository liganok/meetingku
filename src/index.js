'use strict';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import App from './containers/App';
import Home from './containers/Home';


ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="home" component={Home} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
