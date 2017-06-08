import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';

import {
  GET_AGENDALIST,
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.agendaList });

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: GET_AGENDALIST, payload })
});

class AgendaList extends React.Component{

  componentWillMount() {
    this.props.onLoad(agent.Agenda.all());
  }

  render(){
    return(
      <div>
        hello
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);