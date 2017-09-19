import React from 'react'
import { connect } from 'react-redux'
import { SLink } from './common/StyledComponents'
import { withRouter } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Toolbar from 'material-ui/Toolbar'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import Grid from 'material-ui/Grid'
import Menu, { MenuItem } from 'material-ui/Menu';

import { CircularProgress } from 'material-ui/Progress'

import {
  H_ACTION_TOGGLE
} from '../constants/actionTypes'

const mapStateToProps = state => ({...state.header})
const mapDispatchToProps = dispatch => ({
  onActionToggle: () =>
    dispatch({type: H_ACTION_TOGGLE}),
})

function AppHeader (props) {
  const {
    inProgress = false,
    isShowRightButtons = true,
    onActionToggle,
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
      minHeight: '56px'
    },
    accountIcon: {
      width: 60,
      height: 60
    },
  }

  return (
    <div>
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar>
          <IconButton color="contrast" aria-label="Menu" style={styles.menuButton} onClick={onActionToggle}>
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" style={styles.title}>
            Title
          </Typography>
          <div style={{display: inProgress ? '' : 'none'}}>
            <CircularProgress color="contrast" size={22}/>
          </div>
          <IconButton color="contrast" style={{display: isShowRightButtons? null:'none'}}>
            <AccountCircle color="contrast"/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={styles.placeholder}/>
    </div>
  )
}

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <div>
        <div>
        </div>
      </div>
    )
  }
  return null
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div >
        <div>
        </div>
        <SLink
          to={`/profile/${props.currentUser.username}`}
        >
          {props.currentUser.username}
        </SLink>
      </div>
    )
  }
  return null
}

class Header extends React.Component {
  render () {
    return (
      <div>
        <AppHeader
          inProgress={this.props.inProgress}
          onActionToggle={this.props.onActionToggle}
        />
        <Drawer open={this.props.isShowDrawer} onRequestClose={this.props.onActionToggle}>
          <AppHeader
            isShowRightButtons={false}
            onActionToggle={this.props.onActionToggle}
          />

          <Grid style={{width:300}}>
            <SLink to="/agenda" ><MenuItem onClick={this.props.onActionToggle}>Agendas</MenuItem></SLink>
          </Grid>

        </Drawer>
        <LoggedOutView currentUser={this.props.currentUser}/>
        <LoggedInView currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)