import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';
import {Link} from 'react-router-dom'

import Paper from 'material-ui/Paper';

import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import Play from 'material-ui/svg-icons/av/play-arrow';


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
      <Paper
        zDepth={this.props.isShowActions && (id === this.props.mouseOverId) ? 4 : 1}
        onMouseOver={this.actionMouseOver(this.props.agenda.id) }
        onMouseOut={this.actionMouseOut(this.props.agenda.id)}
        style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15}}>

        <Link to={`/detail/${this.props.agenda.id}`} style={{textDecoration: 'none', color: MAIN_TEXT_COLOR}}>
          <h3>{name}</h3>
          <h6 style={{color:HINT_TEXT_COLOR}}>
            <span style={{paddingRight: 10}}>
              Start: {startedAt.substring(0, 10)} {startedAt.substring(11, 16)}
            </span>
            <span style={{paddingRight: 10}}>
              Duration: {duration} Min
            </span>
          </h6>
        </Link>
        <div
          style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',
            visibility: this.props.isShowActions && (id === this.props.mouseOverId) ? 'visible' : 'hidden',
          }}>
          <IconButton style={{margin: 0}}>
            <Edit color="#000"/>
          </IconButton>
          <IconButton style={{margin: 0}}>
            <Delete/>
          </IconButton>
          <IconButton>
            <Play/>
          </IconButton>
        </div>


      </Paper>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem);