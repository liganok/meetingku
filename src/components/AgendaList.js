import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import agent from '../agent';

import AddAgenda from './AddAgenda';
import AgendaItem from './AgendaItem';


import {
  GET_AGENDALIST,
} from '../constants/actionTypes';


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
        <div >
          test
        </div>
      );
    });
    return (
      <div >
        test2
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);