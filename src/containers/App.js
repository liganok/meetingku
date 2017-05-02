import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Hearder from '../components/Header';
import Home from './Home';


class App extends Component {
  render() {
    return (
      <div>
          <Hearder/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
