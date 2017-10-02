import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import {
  AUTH_UPDATE_FIELD,
  AUTH_CHANGE_INDEX,
  REGISTER,
  LOGIN,
} from '../constants/actionTypes'

function Login (props) {
  const {
    email='',
    password='',
    onChangeField,
    onSubmit,
    onChangeIndex
  } = props

  return (
    <Card elevation={0}>
      <form onSubmit={(ev) => {
        onSubmit(email, password)
        ev.preventDefault()
      }}>
        <CardContent>
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={ev => onChangeField('email', ev.target.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            value={password}
            type="password"
            onChange={ev => onChangeField('password', ev.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" raised color="primary">Sign In</Button>
          <Button color="primary" onClick={(ev) => onChangeIndex(1)}>Sign Up</Button>
        </CardActions>
      </form>
    </Card>
  )
}

function Register (props) {
  const {
    email='',
    password='',
    username='',
    onChangeField,
    onSubmit,
    onChangeIndex
  } = props

  return (
    <Card elevation={0}>
      <form onSubmit={(ev) => {
        onSubmit(username, email, password)
        ev.preventDefault()
      }}>
        <CardContent>
          <TextField
            fullWidth
            id="username"
            label="User name"
            value={username}
            onChange={ev => onChangeField('username', ev.target.value)}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={ev => onChangeField('email', ev.target.value)}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            value={password}
            type="password"
            onChange={ev => onChangeField('password', ev.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" raised color="primary">Sign Up</Button>
          <Button color="primary" onClick={(ev) => onChangeIndex(0)}>Sign In</Button>
        </CardActions>
      </form>
    </Card>
  )
}

function TabContainer (props) {
  return <div>{props.children}</div>
}

const mapStateToProps = state => ({...state.auth})

const mapDispatchToProps = dispatch => ({
  onChangeField: (key, value) =>
    dispatch({type: AUTH_UPDATE_FIELD, key: key, value}),
  onSubmitRegister: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password)
    dispatch({type: REGISTER, payload})
  },
  onSubmitLogin: (email, password) => {
    const payload = agent.Auth.login(email, password)
    dispatch({type: LOGIN, payload})
  },
  onChangeIndex: (value) => {
    dispatch({type: AUTH_CHANGE_INDEX, value})
  },
})

function Auth (props) {
  const {
    style,
    email,
    password,
    username,
    tabIndex = 0,
    onChangeField,
    onSubmitRegister,
    onSubmitLogin,
    onChangeIndex
  } = props

  return (
    <div style={style}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={(ev, value) => onChangeIndex(value)}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Sign In"/>
          <Tab label="Sign Up"/>
        </Tabs>
      </AppBar>
      {tabIndex === 0 && <TabContainer>
        <Login
          email={email}
          password={password}
          onChangeField={onChangeField}
          onChangeIndex={onChangeIndex}
          onSubmit={onSubmitLogin}/>
      </TabContainer>}
      {tabIndex === 1 && <TabContainer>
        <Register
          username={username}
          email={email}
          password={password}
          onChangeField={onChangeField}
          onChangeIndex={onChangeIndex}
          onSubmit={onSubmitRegister}/>
      </TabContainer>}

    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
