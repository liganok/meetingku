import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import {HashRouter } from 'react-router-dom'
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <App/>
      </HashRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
