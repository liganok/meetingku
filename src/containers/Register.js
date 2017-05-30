import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';


import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cyan500,
  },
  card: {
    minWidth: 300,
  },
  avatar: {
    margin: '1em',
    textAlign: 'center ',
  },
  form: {
    padding: '0 1em 1em 1em',
  },
  input: {
    display: 'flex',
  },
};

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

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(username, email, password);
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;

    return (
      <div style={{...styles.main}}>
        <Card style={styles.card}>
          <div style={styles.avatar}>
            <Avatar backgroundColor={pinkA200 } icon={<LockIcon />} size={60} />
          </div>
          <form onSubmit={this.submitForm(username, email, password)}>
            <div style={styles.form}>
              <div style={styles.input} >
                <TextField
                  hintText="User name"
                  floatingLabelText="User name"
                  value = {username}
                  onChange={this.changeUsername}
                />
              </div>
              <div style={styles.input} >
                <TextField
                  hintText="Email"
                  floatingLabelText="Email"
                  value = {email}
                  onChange={this.changeEmail}
                />
              </div>
              <div style={styles.input} >
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  value = {password}
                  type="password"
                  onChange={this.changePassword}
                />
              </div>
            </div>
            <CardActions>
              <RaisedButton
                type="submit"
                primary
                icon={this.props.inProgress && <CircularProgress size={25} thickness={2} />}
                label = "Sign Up"
                fullWidth
              />
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
