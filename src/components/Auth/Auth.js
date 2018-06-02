import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import Card, { CardActions, CardContent } from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tabs, { Tab } from '@material-ui/core/Tabs'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Login from './Login'
import Register from './Register'
import OAuth from './OAuth'

import {
  AUTH_UPDATE_FIELD,
  AUTH_CHANGE_INDEX,
  REGISTER,
  LOGIN,
} from '../../constants/actionTypes'

function TabContainer(props) {
  return <div>{props.children}</div>
}

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeField: (key, value) =>
    dispatch({ type: AUTH_UPDATE_FIELD, key: key, value }),
  onSubmitRegister: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password)
    dispatch({ type: REGISTER, payload })
  },
  onSubmitLogin: (email, password) => {
    const payload = agent.Auth.login(email, password)
    dispatch({ type: LOGIN, payload })
  },
  onChangeIndex: (value) => {
    dispatch({ type: AUTH_CHANGE_INDEX, value })
  },
})

function Auth(props) {
  const {
    authError,
    email,
    password,
    username,
    tabIndex = 0,
    onChangeField,
    onSubmitRegister,
    onSubmitLogin,
    onChangeIndex
  } = props

  const styles = {
    root: {
      margin: '0 auto',
      marginTop: '20vh',
      maxWidth: 400,
      height: 200,
    },
  }

  return (
    <div style={styles.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={(ev, value) => onChangeIndex(value)}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
      </AppBar>
      <OAuth style={{marginTop:20}}/>
      <div style={{ display: 'flex',alignItems:'center', marginTop: 10, marginBottom: 10}}>
        <Divider style={{ flex:1 }} />
        <Typography variant="caption" style={{ paddingLeft: 10, paddingRight: 10}}>OR</Typography>
        <Divider style={{ flex:1 }} />
      </div>
      <div style={{backgroundColor:'white',paddingLeft:15,paddingRight:15,display:!authError&&'none'}}>
        <Typography style={{padding:'10px 0 10px 0'}} color='error'>{authError && authError}</Typography>
        <Divider/>
      </div>
      {tabIndex === 0 && <TabContainer>
        <Login
          email={email}
          password={password}
          onChangeField={onChangeField}
          onChangeIndex={onChangeIndex}
          onSubmit={onSubmitLogin} />
      </TabContainer>}
      {tabIndex === 1 && <TabContainer>
        <Register
          username={username}
          email={email}
          password={password}
          onChangeField={onChangeField}
          onChangeIndex={onChangeIndex}
          onSubmit={onSubmitRegister} />
      </TabContainer>}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
