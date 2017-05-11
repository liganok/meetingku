import React, {Component} from 'react';
import Hearder from '../components/Header';

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
