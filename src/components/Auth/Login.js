import React from 'react'
import Card, { CardActions, CardContent } from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
function Login(props) {
  const {
    email = '',
    password = '',
    onChangeField,
    onSubmit
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
          <Button type="submit" variant="raised"  fullWidth color="primary">Log In</Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default Login
