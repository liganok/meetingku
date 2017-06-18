import {Switch, Route, Link, withRouter} from 'react-router-dom'
import React from 'react';
import {connect} from 'react-redux';
import {APP_LOAD, REDIRECT} from '../constants/actionTypes';
import agent from '../agent';

import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Header from './Header';
import AgendaList from './AgendaList';
import AgendaItem from './AgendaItem';
import AgendaDetail from './AgendaDetail';



const styles = {
  root: {
    minWidth: '360px',
    width: '632px',
    margin: '16px auto',
  },
  snackbar: {
    /*   top:0,
     transform: open ?
     'translate(50%, 0)' :
     `translate(50%, 50)`,*/
  }
};

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  inProgress: state.common.inProgress
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: REDIRECT})
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}/>

        <Snackbar
          style={styles.snackbar}
          open={this.props.inProgress ? this.props.inProgress : false}
          message={'In process...'}/>
        <Switch >
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
        <div style={styles.root}>
          <Switch >
            <Route exact path='/' component={AgendaList}/>
            <Route path='/agendalist' component={AgendaList}/>
            <Route path='/AgendaItem' component={AgendaItem}/>
            <Route path='/detail' component={AgendaDetail}/>
            <Route path='/profile' component={Profile}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
