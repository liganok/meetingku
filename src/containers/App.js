import {HashRouter, Switch, Route,Link } from 'react-router-dom'
import React from 'react';
import Login from '../containers/Login';
import Header from '../containers/Header';

import Agenda from '../components/AgendaList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/agenda' component={Agenda}/>
        </Switch>
      </div>
    );
  }
}

export default App;
