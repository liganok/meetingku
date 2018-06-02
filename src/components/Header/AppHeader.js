import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import { CircularProgress } from '@material-ui/core'

import LoggedInView from './LoggedInView'
import LoggedOutView from './LoggedOutView'

function AppHeader(props) {
  const {
    user,
    inProgress = false,
    isShowRightButtons = true,
    appName,
    onActionToggle,
    appLoaded,
    style
  } = props

  const styles = {
    title: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
    },
    placeholder: {
      minHeight: 80
    },
  }

  return (
    <div style={style}>
      <AppBar position="fixed">
        <Toolbar style={{display:'flex',alignItems:'center'}}>
          <IconButton
            color="inherit" aria-label="Menu"
            style={styles.menuButton}
            onClick={onActionToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={styles.title}>
            {appName}
          </Typography>
          <div style={{ display: inProgress ? '' : 'none' }}>
            <CircularProgress color="inherit" size={22} />
          </div>
          {appLoaded && (user ?
            <LoggedInView user={user} isShow={isShowRightButtons} /> :
            <LoggedOutView isShow={isShowRightButtons} />)}
        </Toolbar>
      </AppBar>
      <div style={styles.placeholder} />
    </div>
  )
}

AppHeader.propTypes = {
  user: PropTypes.object,
  inProgress: PropTypes.bool,
  appLoaded: PropTypes.bool,
  isShowRightButtons: PropTypes.bool,
  appName: PropTypes.string,
  onActionToggle: PropTypes.func,

}

export default AppHeader