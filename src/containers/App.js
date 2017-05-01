import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Hearder from '../components/Header';
import Home from './Home';


class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Hearder/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
