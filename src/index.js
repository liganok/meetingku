import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import store from './store';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, teal } from 'material-ui/colors'
import App from './components/App';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';


const theme = createMuiTheme({
  // palette: {
  //   primary: blue,
  //   secondary: teal
  // }
});

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

