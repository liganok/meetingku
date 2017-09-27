import { Switch, Route, Link, withRouter } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import { APP_LOAD, REDIRECT } from '../constants/actionTypes'
import agent from '../agent'

import Login from './Login'
import Register from './Register'
import Setting from './Setting'
import Header from './Header'
import AgendaList from './Agenda'
import AgendaItem from './AgendaItem'
import AgendaDetail from './AgendaDetail'
import Play from './AgendaPlay'
import TemplateList from './Template'
import TrashList from './Trash'
import Help from './Help'

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  inProgress: state.common.inProgress
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({type: REDIRECT})
})

class App extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
      this.props.history.push(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount () {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render () {
    let path = this.props.location.pathname
    if (/*path.indexOf('/login') !== -1 || path.indexOf('/register') !== -1 ||*/ path.indexOf('/play') !== -1) {
      var isNoHeader = true
    }
    isNoHeader = true
    return (
      <div>
        {isNoHeader ? <div/> : <Header
          appName={this.props.appName}
          inProgress={this.props.inProgress}
          currentUser={this.props.currentUser}/>}
        {this.props.appLoaded ? <Switch>
          <Route exact path='/' component={AgendaList}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/agenda' component={AgendaList}/>
          <Route path='/AgendaItem' component={AgendaItem}/>
          <Route path='/detail/:id' component={AgendaDetail}/>
          <Route path='/play/:id' component={Play}/>
          <Route path='/new' component={AgendaDetail}/>
          <Route path='/setting' component={Setting}/>
          <Route path='/template' component={TemplateList}/>
          <Route path='/trash' component={TrashList}/>
          <Route path='/help' component={Help}/>
        </Switch> : null}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
