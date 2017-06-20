import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';


import {
  AGENDALIST_NAV_DETAIL,
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes';

const mapStateToProps = state => ({...state.agendaItem});
const mapDispatchToProps = dispatch => ({
  onNavDetail: value =>
    dispatch({type: AGENDALIST_NAV_DETAIL, payload: value}),
  onActionMouseOver: value =>
    dispatch({type: AI_ACTION_MOUSE_OVER, payload: value}),
  onActionMouseOut: value =>
    dispatch({type: AI_ACTION_MOUSE_OUT, payload: value}),

});

class AgendaItem extends React.Component {
  constructor() {
    super();
    this.navDetail = (value) => ev => {
      this.props.onNavDetail(value);
    };
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

    const styles = {

      header: {
        paddingTop: 0,
        fontWeight: 'bold'
      },

      cardBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      cardBodyLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },

      cardBodyRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'flex-end',
      },

      cardActions: {
        //display: this.props.isShowActions&&(id === this.props.mouseOverId)? 'block':'None',
        visibility: this.props.isShowActions && (id === this.props.mouseOverId) ? 'visible' : 'hidden',

      },

      largeIcon: {
        width: 40,
        height: 40,
      },

    };

    return (
      <Card
        zDepth={2}
        onMouseOver={this.actionMouseOver(this.props.agenda.id) }
        onMouseOut={this.actionMouseOut(this.props.agenda.id)}>

        <CardHeader
          title={name}
          actAsExpander={true}
          showExpandableButton={false}
          onClick={this.navDetail(this.props.agenda)}
        />

        <div style={styles.cardBody}>
          <div style={styles.cardBodyLeft}>
            <CardText onClick={this.navDetail(this.props.agenda)}>
              <div>
                Start: {startedAt.substring(0, 10)} {startedAt.substring(11, 16)} Duration: {duration}
              </div>
              <div>
                Updat: {updatedAt.substring(0, 10)} {updatedAt.substring(11, 16)}
              </div>
            </CardText>

            <CardActions style={styles.cardActions}>
              <IconButton>
                <ActionHome/>
              </IconButton>
              <IconButton>
                <ActionHome/>
              </IconButton>
            </CardActions>
          </div>

          <div style={styles.cardBodyRight}>
            <PlayCircleOutline style={styles.largeIcon}/>
          </div>
        </div>

      </Card>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem);