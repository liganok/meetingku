import React from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Agenda from './AgendaList';


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
  link:{
    textDecoration:'none'
  },
  appBar:{
    margin:0
  },
  IconButton:{
    display:'flex',
    flexDirection:'row',
    color:'#ffffff',
  }
};

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <div style={{...styles.login.block,}}>
        <div style={{display: false}}>
        </div>
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
        </div>
        <Link
          to={`/profile/${props.currentUser.username}`}
        >
          {props.currentUser.username}
        </Link>
      </div>
    );
  }
  return null;
}

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {open: false}
  }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    const iconER = (
        <div>

        </div>
    );

    return (
      <div>


          <LoggedOutView currentUser={this.props.currentUser}/>
          <LoggedInView currentUser={this.props.currentUser}/>

      </div>
    );
  }
}

export default withRouter(Header);