import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';



const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

function Register (props) {
  const {
    email,
    password,
    username,
    onChangeEmail,
    onChangePassword,
    onChangeUsername,
    onSubmit
  } = props

  const styles ={
    root:{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      minWidth: 300,
    },
  }

  return(
    <div style={styles.root}>
      <Card style={styles.card}>
        <form onSubmit={()=>onSubmit(username, email, password)}>
          <CardContent>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={ev=>onChangeEmail(ev.target.value)}
            />
            <TextField
              fullWidth
              id="username"
              label="User name"
              value={username}
              onChange={ev=>onChangeUsername(ev.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              value={password}
              type="password"
              onChange={ev=>onChangePassword(ev.target.value)}/>
          </CardContent>
          <CardActions>
            <Button type="submit" raised color="primary">Sign Up</Button>
            <Button color="primary" href="/login">Sign In</Button>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
