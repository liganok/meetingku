import React from 'react';
import { connect } from 'react-redux';

import {
  GET_AGENDALIST,
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.agendaList });

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: GET_AGENDALIST })
});

class AgendaList extends React.Component{

  componentWillMount() {
    this.props.onLoad();
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