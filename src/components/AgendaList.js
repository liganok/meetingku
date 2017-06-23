import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

import {List, ListItem} from 'material-ui/List';
import AddAgenda from './AddAgenda';
import AgendaItem from './AgendaItem';


import {
  GET_AGENDALIST,
  AGENDALIST_NAV_DETAIL
} from '../constants/actionTypes';

const styles = {

  listItem: {
    padding: 0,
    marginTop: '20px',

  },

};

const mapStateToProps = state => ({...state.agendaList});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({type: GET_AGENDALIST, payload}),
  onNavDetail: value =>
    dispatch({type: AGENDALIST_NAV_DETAIL, payload: value}),
});


class AgendaList extends React.Component {

  constructor() {
    super();
    this.navDetail = (value) => ev => {
      this.props.onNavDetail(value);
    }
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
      <div>
        <AddAgenda/>
        <List style={styles.listItem}>
          {list}
        </List>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);