import { withRouter } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import agent from '../agent'
import routes from '../routes'
import Header from './Header/Header'
import MessageBox from './common/MessageBox'

const mapStateToProps = state => ({ ...state.common })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({ type: types.APP_LOAD, payload, token, }),
  onRedirect: (value = null) => dispatch({ type: types.REDIRECT, value: value }),
  onRequestClose: () => dispatch({ type: types.CLOSE_MSG }),
  onActionToggle: () => dispatch({ type: types.H_ACTION_TOGGLE }),
  onMouseOver: () => dispatch({ type: types.H_ACTION_MOUSEOVER }),
  onMouseOut: () => dispatch({ type: types.H_ACTION_MOUSEOUT }),
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
      this.props.history.push(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.getUserInfo() : null, token)
  }

  render() {
    const {
      location,
      appName,
      inProgress,
      isShowDrawer,
      currentUser,
      appLoaded,
      msg,
      isShowMsg,
      onRequestClose,
      onActionToggle
    } = this.props

    let isShowHeader = true
    if ( /*path.indexOf('/login') !== -1 || path.indexOf('/register') !== -1 ||*/ location.pathname.indexOf('/play') !== -1) {
      isShowHeader = false
    }
    //isShowHeader = false
    return (
      <div>
        {isShowHeader &&
          <Header
            appName={appName}
            user={currentUser}
            appLoaded={appLoaded}
            inProgress={inProgress}
            isShowDrawer={isShowDrawer}
            onActionToggle={onActionToggle} />}
        <div style={styles.body}>
          {appLoaded && routes}
        </div>
        <MessageBox
          msg={msg}
          isShowMsg={isShowMsg}
          onRequestClose={onRequestClose} />
      </div>
    )
  }
}

const styles = {
  body: {
    margin: '0 auto',
    padding: 0,
    maxWidth: 700,
    minWidth: 100
  }
}

App.propTypes = {
  redirectTo: PropTypes.string,
  history: PropTypes.any,
  location: PropTypes.any,
  appName: PropTypes.string,
  inProgress: PropTypes.bool,
  isShowDrawer: PropTypes.bool,
  currentUser: PropTypes.object,
  appLoaded: PropTypes.bool,
  msg: PropTypes.object,
  isShowMsg: PropTypes.bool,
  onRedirect: PropTypes.func,
  onRequestClose: PropTypes.func,
  onLoad: PropTypes.func,
  onActionToggle: PropTypes.func,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
