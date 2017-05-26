import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Drawer, Avatar} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

import Divider from 'material-ui/Divider';
import {HashRouter, Switch, Route, Link} from 'react-router-dom'
import Agenda from '../components/AgendaList';


const styles = {
  main: {
    marginLeft: '1em',
  },
  login: {
    block: {
      margin: '1em',
      textAlign: 'center ',
    },
    button: {
      margin: 8,
    }
  },
  input: {
    display: 'flex',
  },
};

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <div style={{...styles.login.block,}}>
        <div style={{display: false}}>
          <Avatar icon={<LockIcon />} size={50}/>
        </div>
        <Link to="/login"><RaisedButton label="Sign In" default={true} style={styles.login.button}/></Link>
        <RaisedButton label="Sign Up" primary={true} style={styles.login.button}/>
        <Divider />
      </div>
    );
  }
  return null;
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div style={{...styles.login.block,}}>
        <div style={{display: false}}>
          <Avatar icon={<AccountCircle />} size={50}/>
        </div>
        <Link
          to={`/user/${props.currentUser.username}`}
        >
          {props.currentUser.username}
        </Link>
        <Divider />
      </div>
    );
  }
  return null;
}

class Header extends React.Component {
  constructor() {
    super();
    this.state = {open: false}
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  };

  render() {
    return (
      <div>
        <AppBar
          title="Test"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer style={styles.main}
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
        >
          <AppBar
            title="Test"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />

          <LoggedOutView currentUser={this.props.currentUser}/>
          <LoggedInView currentUser={this.props.currentUser}/>

          <Link to="/agenda"><MenuItem onTouchTap={this.handleToggle}>Agenda</MenuItem></Link>

          <MenuItem onTouchTap={this.handleToggle}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Header;