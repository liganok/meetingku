import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import agent from '../agent';

import {List, ListItem} from 'material-ui/List';
import AddAgenda from './AddAgenda';
import AgendaItem from './AgendaItem';


import {
  GET_AGENDALIST,
} from '../constants/actionTypes';

const styles = {
  root: {
    minWidth: '360px',
    width: '632px',
    margin: '16px auto',
  },

  listItem: {
    padding: 0,
    marginTop: '20px',
  },

  link:{
    textDecoration:'none'
  },

};

const mapStateToProps = state => ({...state.agendaList});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_AGENDALIST, payload}),
});


class AgendaList extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.props.onLoad(agent.Agenda.all());
  }

  render() {
    if (!this.props.agendas) return (<div><AddAgenda/></div>)
    let list = this.props.agendas.map((item, index) => {
      return (
        <ListItem key={index} innerDivStyle={styles.listItem}>
          <AgendaItem
            agenda={item}
          />
        </ListItem>
      );
    });
    return (
      <div style={styles.root}>
        <Link to="/new" style = {styles.link}><AddAgenda/></Link>
        <List style={styles.listItem}>
          {list}
        </List>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);