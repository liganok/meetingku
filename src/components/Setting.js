import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import VDivider from './common/VDivider'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import IconButton from 'material-ui/IconButton'

import {
  LOGOUT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT })
})

const styles = {
  root: {
    padding: '10px 15px 10px 15px',
  },
  icon: {
    width: 20,
    height: 20
  },
  iconButton: {
    width: 40,
    height: 40
  }
}

function Setting(props) {
  const { username, email } = props
  return (
    <Grid container justify="center">
      <Grid item xs={11} style={{ maxWidth: 700, marginTop: 20 }}>
        <Paper>
          {!username &&
            <Grid style={styles.root} container justify="space-between" align="center">
              <Grid item xs={8} container direction="column" >
                <Typography>{props.currentUser.username}</Typography>
                <Typography color="secondary">{props.currentUser.email}</Typography>
              </Grid>
              <Grid item xs={4} container justify="flex-end" align="center">
                <IconButton style={styles.iconButton}><KeyboardArrowRight style={styles.icon} /></IconButton>
                <VDivider height={30} />
                <Button dense onClick={props.onClickLogout}>Logout</Button>
              </Grid>
            </Grid>}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)