import React from 'react'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

function Register(props) {
  const {
    email = '',
    password = '',
    username = '',
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
        </CardActions>
      </form>
    </Card>
  )
}

export default Register
