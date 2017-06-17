import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <App/>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
