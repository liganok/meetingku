import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import MenuIcon from 'material-ui-icons/Menu'
import { CircularProgress } from 'material-ui/Progress'

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
  } = props

  const styles = {
    title: {
      flex: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    placeholder: {
      minHeight: 80
    },
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar style={{display:'flex',alignItems:'center'}}>
          <IconButton
            color="contrast" aria-label="Menu"
            style={styles.menuButton}
            onClick={onActionToggle}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={styles.title}>
            {appName}
          </Typography>
          <div style={{ display: inProgress ? '' : 'none' }}>
            <CircularProgress color="inherit" size={22} />
          </div>
          {appLoaded && (user ?
            <LoggedInView isShow={isShowRightButtons} /> :
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