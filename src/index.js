import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, hashHistory } from 'react-router';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import routes from './router/routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={hashHistory}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
