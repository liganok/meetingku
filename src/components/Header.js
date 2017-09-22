import React from 'react'
import { connect } from 'react-redux'
import { SLink } from './common/StyledComponents'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import Drawer from 'material-ui/Drawer'
import Grid from 'material-ui/Grid'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import ViewAgenda from 'material-ui-icons/ViewAgenda'
import Delete from 'material-ui-icons/Delete'
import Help from 'material-ui-icons/Help'
import Description from 'material-ui-icons/Description'
import Settings from 'material-ui-icons/Settings'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'

import Auth from './Auth';

import {
  H_ACTION_TOGGLE,
  H_ACTION_MOUSEOVER,
  H_ACTION_MOUSEOUT
} from '../constants/actionTypes'

function UserDetail (props) {
  const {
    user,
    isShowUserDetail = false,
    onMouseOver,
    onMouseOut
  } = props

  const styles = {
    root: {
      visibility: isShowUserDetail ? 'visible' : 'hidden',
      position: 'fixed',
      paddingRight: 10,
      transitionDelay: '1s',
      zIndex:1,
    },
    paper:{
      width: 400,
      opacity: 0.9
    }
  }


  function LoggedInView (props) {
    const {
      user = {}
    } = props
    return (
      <div style={{width: 200, height: 200}}>
        <div>
        </div>
        <SLink
          to={`/profile/${1}`}
        >
          {user.username}
        </SLink>
      </div>
    )
  }

  return (
    <Grid container justify="flex-end" style={styles.root}>
      <Paper
        elevation={0}
        style={styles.paper}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        {user ? <LoggedInView user={user}/> : <Auth/>}
      </Paper>
    </Grid>
  )
}

function AppHeader (props) {
  const {
    inProgress = false,
    position = 'fixed',
    isShowRightButtons = true,
    onActionToggle,
    onMouseOver,
    onMouseOut
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
      <AppBar position={position} style={styles.appBar}>
        <Toolbar>
          <IconButton
            color="contrast" aria-label="Menu"
            style={styles.menuButton}
            onClick={onActionToggle}>
            <MenuIcon/>
          </IconButton>
          <Typography type="title" color="inherit" style={styles.title}>
            Agenda
          </Typography>
          <div style={{display: inProgress ? '' : 'none'}}>
            <CircularProgress color="contrast" size={22}/>
          </div>
          <IconButton
            color="contrast"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            style={{display: isShowRightButtons ? null : 'none'}}>
            <AccountCircle color="contrast"/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={styles.placeholder}/>
    </div>
  )
}

const mapStateToProps = state => ({...state.header})
const mapDispatchToProps = dispatch => ({
  onActionToggle: () =>
    dispatch({type: H_ACTION_TOGGLE}),
  onMouseOver: () =>
    dispatch({type: H_ACTION_MOUSEOVER}),
  onMouseOut: () =>
    dispatch({type: H_ACTION_MOUSEOUT}),
})

class Header extends React.Component {
  render () {
    return (
      <div>
        <AppHeader
          inProgress={this.props.inProgress}
          onActionToggle={this.props.onActionToggle}
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}/>
        <UserDetail
          user={this.props.currentUser}
          isShowUserDetail={this.props.isShowUserDetail}
          onMouseOver={this.props.onMouseOver}
          onMouseOut={this.props.onMouseOut}/>
        <Drawer open={this.props.isShowDrawer} onRequestClose={this.props.onActionToggle}>
          <AppHeader
            isShowRightButtons={false}
            position="absolute"
            onActionToggle={this.props.onActionToggle}
          />

          <Grid style={{width: 300, paddingLeft: 10}}>
            <SLink to="/agenda">
              <ListItem button onClick={this.props.onActionToggle}>
                <ListItemIcon>
                  <ViewAgenda/>
                </ListItemIcon>
                <ListItemText primary="Agenda"/>
              </ListItem>
            </SLink>
            <SLink to="/template">
              <ListItem button onClick={this.props.onActionToggle}>
                <ListItemIcon>
                  <Description/>
                </ListItemIcon>
                <ListItemText primary="Template"/>
              </ListItem>
            </SLink>
            <SLink to="/trash">
              <ListItem button onClick={this.props.onActionToggle}>
                <ListItemIcon>
                  <Delete/>
                </ListItemIcon>
                <ListItemText primary="Trash"/>
              </ListItem>
            </SLink>
            <SLink to="/setting">
              <ListItem button onClick={this.props.onActionToggle}>
                <ListItemIcon>
                  <Settings/>
                </ListItemIcon>
                <ListItemText primary="Setting"/>
              </ListItem>
            </SLink>
            <SLink to="/help">
              <ListItem button onClick={this.props.onActionToggle}>
                <ListItemIcon>
                  <Help/>
                </ListItemIcon>
                <ListItemText primary="Help"/>
              </ListItem>
            </SLink>
          </Grid>
        </Drawer>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)