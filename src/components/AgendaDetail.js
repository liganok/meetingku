import React from 'react';
import {connect} from 'react-redux';

import agent from '../agent';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';


import {
  AGENDA_UPDATE_FIELD,
  AGENDA_SAVE,
} from '../constants/actionTypes';

import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


const mapStateToProps = state => ({...state.agendaDetail});
const mapDispatchToProps = dispatch => ({
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload: agent.Agenda.create(agenda)}),
  onChangeField: (id, key, value) => dispatch({type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value}),


});

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  body: {},

  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '10px',
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item_textField_header: {
    bold: true,
  },

  item_textField: {
    fontSize: '14px',
  },

  item_time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  item_time_datePicker: {
    width: 75,
    fontSize: '9px',
  },

  item_time_timePicker: {
    width: 50,
    fontSize: '9px',
  },

  item_time_duration: {
    fontSize: '15px',
    paddingLeft: '5px',
  },

  noDisplay: {
    display: 'none',
  },

};


class AgendaDetail extends React.Component {
  constructor() {
    super();
    this.changeStartedAt = (ev, data) => this.props.onChangeStartedAt(data);

  }

  handleSaveAgenda() {
    let agenda = {
      name: this.props.name,

    };
    if (agenda.name) {
      this.props.onSaveAgenda(agenda);
    }
    this.props.onCloseDialog();
  }

  renderComponent(agenda) {
    let componentArr = [];
    let isHasStartedAt = (typeof (agenda.startedAt) !== 'undefined');
    if (typeof(agenda.subItems[0]) == 'undefined') {
      componentArr.push(
        <div style={{paddingLeft: '15px'}} key={agenda.id}>
          <div style={styles.item}>
            <TextField
              id={`name${agenda.id}`}
              underlineShow={false}
              style={typeof(agenda.startedAt) === 'undefined' ? styles.item_textField : styles.item_textField_header}
              hintText="Name"
              value={agenda.name}
              onChange={(ev) => {
                this.props.onChangeField(agenda.id, 'name', ev.target.value)
              }}
            />
            <div style={styles.item_time}>
              <DatePicker
                id={`data${agenda.id}`}
                textFieldStyle={styles.item_time_datePicker}
                style={!isHasStartedAt ? styles.noDisplay : styles.item_time_datePicker}
                hintText="Start"
                value={isHasStartedAt ? new Date(agenda.startedAt) : null}
                onChange={(ev, date) => {
                  this.props.onChangeField(agenda.id, 'startedAt', date);
                }}/>
              <TimePicker
                id={`time${agenda.id}`}
                textFieldStyle={styles.item_time_timePicker}
                style={!isHasStartedAt ? styles.noDisplay : styles.item_time_timePicker}
                value={isHasStartedAt ? new Date(agenda.startedAt) : null}
                onChange={(ev, time) => {
                  this.props.onChangeField(agenda.id, 'startedAt', time)
                }}/>
              <TextField
                id={`duration${agenda.id}`}
                underlineShow={false}
                style={styles.item_time_duration}
                value={`${agenda.duration} m`}/>
            </div>
          </div>
          <Divider/>
        </div>
      );
      return componentArr;
    } else {

      componentArr.push(
        <div style={{paddingLeft: '15px'}} key={agenda.id}>
          <div style={styles.item}>
            <TextField
              id={`name${agenda.id}`}
              underlineShow={false}
              style={typeof(agenda.startedAt) === 'undefined' ? styles.item_textField : styles.item_textField_header}
              hintText="Name"
              value={agenda.name}
              onChange={(ev) => {
                this.props.onChangeField(agenda.id, 'name', ev.target.value)
              }}
            />

            <div style={styles.item_time}>
              <DatePicker
                id={`data${agenda.id}`}
                textFieldStyle={styles.item_time_datePicker}
                style={!isHasStartedAt ? styles.noDisplay : styles.item_time_datePicker}
                hintText="Start"
                value={isHasStartedAt ? new Date(agenda.startedAt) : null}
                onChange={(ev, date) => {
                  this.props.onChangeField(agenda.id, 'startedAt', date);
                }}/>
              <TimePicker
                id={`time${agenda.id}`}
                textFieldStyle={styles.item_time_timePicker}
                style={!isHasStartedAt ? styles.noDisplay : styles.item_time_timePicker}
                value={isHasStartedAt ? new Date(agenda.startedAt) : null}
                onChange={(ev, time) => {
                  this.props.onChangeField(agenda.id, 'startedAt', time);
                }}/>
              <TextField
                id={`duration${agenda.id}`}
                underlineShow={false}
                style={styles.item_time_duration}
                value={`${agenda.duration} m`}/>
            </div>
          </div>
          <Divider/>
        </div>
      );

      agenda.subItems.forEach(item => {
        componentArr.push(
          <div style={{paddingLeft: '15px'}} key={`subItem${item.id}`}>
            {this.renderComponent(item)}
          </div>
        );
      });

      return componentArr;
    }
  }


  render() {

    const currentAgenda = this.props.currentAgenda;
    if (!currentAgenda) {
      return null;
    }

    console.log('styles', styles);

    return (
      <Paper zDepth={2} style={styles.root}>
        <div style={styles.body}>
          {this.renderComponent(this.props.currentAgenda)}
        </div>

        <div style={styles.footer}>
          <RaisedButton label="Save" primary={true} onTouchTap={(ev) => this.props.history.push('/login')}/>
        </div>

      </Paper>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail);