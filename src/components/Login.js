import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
} from '../constants/actionTypes';



const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeField: (key,value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: key, value }),
  onSubmit: (email, password) => {
    const payload = agent.Auth.login(email, password);
    dispatch({ type: LOGIN, payload })
  },
});

function Login (props) {
  const {
    email,
    password,
    onChangeField,
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
      width:400,
    },
  }

  return(
    <div style={styles.root}>
      <Card style={styles.card}>
        <form onSubmit={(ev)=>{onSubmit(email, password);ev.preventDefault()}}>
          <CardContent>
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
            <Button type="submit" raised color="primary">Sign In</Button>
            <Link to="/register"><Button color="primary">Sign Up</Button></Link>
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
