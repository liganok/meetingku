import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import store from './store';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import App from './components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const theme = createMuiTheme({

});

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App/>
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
