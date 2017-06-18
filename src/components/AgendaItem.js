import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


import {
  AGENDALIST_NAV_DETAIL,
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes';

const mapStateToProps = state => ({...state.agendaItem});
const mapDispatchToProps = dispatch => ({
  onNavDetail: value =>
    dispatch({type: AGENDALIST_NAV_DETAIL, payload: value}),
  onActionMouseOver: value=>
    dispatch({type: AI_ACTION_MOUSE_OVER, payload:value}),
  onActionMouseOut: value=>
    dispatch({type: AI_ACTION_MOUSE_OUT, payload:value}),

});

class AgendaItem extends React.Component {
  constructor() {
    super();
    this.navDetail = (value) => ev => {
      this.props.onNavDetail(value);
    };
    this.actionMouseOver = (value) => ev => {this.props.onActionMouseOver(value)};
    this.actionMouseOut = (value) => ev => {this.props.onActionMouseOut(value)};

  }


  render() {
    const name = this.props.agenda.name ? this.props.agenda.name : '';
    const startedAt = this.props.agenda.startedAt ? new Date(this.props.agenda.startedAt).toISOString() : '';
    const updatedAt = this.props.agenda.updatedAt ? new Date(this.props.agenda.updatedAt).toISOString() : '';
    const duration = this.props.agenda.duration ? this.props.agenda.duration : '';
    const id = this.props.agenda.id;

    const styles = {
      root: {
        paddingLeft: 10,
        display: 'block',
      },

      header: {
        paddingTop: 0,
        fontWeight: 'bold'
      },

      content: {
        width: '40px',
        fontSize: '14px',
      },

      cardActions: {
        display: this.props.isShowActions&&(id === this.props.mouseOverId)? 'block':'None',
      },

      startText: {},

      durationLabel: {},

    };

    return (
      <Card onMouseOver={this.actionMouseOver(this.props.agenda.id) } onMouseOut={this.actionMouseOut(this.props.agenda.id)}>
        <div onClick={this.navDetail(this.props.agenda)} >
          <CardHeader
            title={name}
            actAsExpander={true}
            showExpandableButton={false}
          />
          <CardText>
            <div>
              Start: {startedAt.substring(0, 10)} {startedAt.substring(11, 16)} Duration: {duration}
            </div>
            <div>
              Updat: {updatedAt.substring(0, 10)} {updatedAt.substring(11, 16)}
            </div>
          </CardText>
        </div>

        <div style={styles.cardActions}>
          <CardActions >
            <FlatButton label="Action1" onTouchTap={ev => {
              alert('he')
            }}/>
            <FlatButton label="Action2"/>
          </CardActions>
        </div>

      </Card>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem);