import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
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
}

const mapStateToProps = state => ({...state.auth})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
  onChangePassword: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
  onSubmit: (email, password) =>
    dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)}),
  onUnload: () =>
    dispatch({type: 'LOGIN_PAGE_UNLOADED'})
})

class Login extends React.Component {
  constructor () {
    super()
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.submitForm = (email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(email, password)
    }
  }

  componentWillUnmount () {
    this.props.onUnload()
  }

  render () {
    const email = this.props.email
    const password = this.props.password
    return (
      <div style={{...styles.main,}}>
        <Card style={styles.card}>
          <form onSubmit={this.submitForm(email, password)}>
            <CardContent>
              <TextField
                fullWidth
                id="username"
                label="User name"
                value={email}
                onChange={this.changeEmail}
              />
              <TextField
                fullWidth
                id="password"
                label="Password"
                value={password}
                type="password"
                onChange={this.changePassword}/>
            </CardContent>
            <CardActions>
              <Button type="submit" raised color="primary">Sign In</Button>
              <Button color="primary" href="/register">Sign up</Button>
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
