import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';
import {Link} from 'react-router-dom'



import {
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes';

import {
  MAIN_TEXT_COLOR,
  HINT_TEXT_COLOR,
} from '../constants/colors';

const mapStateToProps = state => ({...state.agendaItem});
const mapDispatchToProps = dispatch => ({
  onActionMouseOver: value =>
    dispatch({type: AI_ACTION_MOUSE_OVER, payload: value}),
  onActionMouseOut: value =>
    dispatch({type: AI_ACTION_MOUSE_OUT, payload: value}),

});

class AgendaItem extends React.Component {
  constructor() {
    super();
    this.actionMouseOver = (value) => ev => {
      this.props.onActionMouseOver(value)
    };
    this.actionMouseOut = (value) => ev => {
      this.props.onActionMouseOut(value)
    };

  }


  render() {
    const name = this.props.agenda.name ? this.props.agenda.name : '';
    const startedAt = this.props.agenda.startedAt ? new Date(this.props.agenda.startedAt).toISOString() : '';
    const updatedAt = this.props.agenda.updatedAt ? new Date(this.props.agenda.updatedAt).toISOString() : '';
    const duration = this.props.agenda.duration ? this.props.agenda.duration : '';
    const id = this.props.agenda.id;

    return (
      <div>
        test
      </div>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem);