import React from 'react'
import Auth from './Auth'
import Grid from 'material-ui/Grid'

function Login () {

  const styles = {
    root: {
      marginTop: '20vh',
      maxWidth: 400,
      height: 200
    },
  }

  return (
    <Grid container justify="center">
      <Grid item xs={11} style={styles.root}>
        <Auth tabIndex={0} />
      </Grid>
    </Grid>
  )
}

export default Login
