import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
} from '../constants/actionTypes';



const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeField: (key,value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: key, value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
});

function Register (props) {
  const {
    email,
    password,
    username,
    onChangeField,
    onSubmit
  } = props

  const styles ={
    root:{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      minWidth: 300,
      width:400,
    },
  }

  return(
    <div style={styles.root}>
      <Card style={styles.card}>
        <form onSubmit={(ev)=>{onSubmit(username, email, password);ev.preventDefault()}}>
          <CardContent>
            <TextField
              fullWidth
              id="username"
              label="User name"
              value={username}
              onChange={ev=>onChangeField('username',ev.target.value)}
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={ev=>onChangeField('email',ev.target.value)}
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              value={password}
              type="password"
              onChange={ev=>onChangeField('password',ev.target.value)}
              />
          </CardContent>
          <CardActions>
            <Button type="submit" raised color="primary">Sign Up</Button>
            <Link to="/login"><Button color="primary">Sign In</Button></Link>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
