import React from 'react'
import Auth from './Auth'
import Grid from 'material-ui/Grid'

function Login (props) {

  const styles = {
    root: {
      marginTop: '20vh',
      width: 400,
      height: 200
    },
  }

  return (
    <Grid container justify="center">
      <Auth tabIndex={0} style={styles.root}/>
    </Grid>
  )
}

export default Login
