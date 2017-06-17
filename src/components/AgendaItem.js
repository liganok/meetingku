import React from 'react';
import {connect} from 'react-redux';
import agent from '../agent';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import {
  AGENDA_UPDATE_FIELD,
  AGENDA_CREATE,
  AGENDA_SAVE,
  AGENDA_CLOSE_DIALOG} from '../constants/actionTypes';

import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';


const styles = {
  root: {
    padding:0,
  },
  hintText: {
    padding: 15,
  },

  textField: {
    paddingLeft:10,
    paddingTop:0,

  },

  dialog: {}
};


const mapStateToProps = state => ({...state.agenda});
const mapDispatchToProps = dispatch => ({
  onChangeName: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'name', value}),
  onChangeStartDate: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'startDate', value}),
  onChangeStartTime: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'startTime', value}),
  onChangeDuration: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'duration', value}),
  onCreateAgenda: () => dispatch({type: AGENDA_CREATE}),
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload:agent.Agenda.create(agenda)}),
  onCloseDialog: () => dispatch({type: AGENDA_CLOSE_DIALOG}),

});

class AgendaItem extends React.Component {
  constructor() {
    super();
    this.changeName = ev => this.props.onChangeName(ev.target.value);
    this.changeStartDate = (ev, data) => this.props.onChangeStartDate(data);
    this.changeStartTime = (ev, time) => this.props.onChangeStartTime(time);

    this.state = {
      isAddAgenda: false,
    };
  }


  handleSaveAgenda() {
    let agenda = {
      name:this.props.name,

    };
    if(agenda.name){
      this.props.onSaveAgenda(agenda);
    }
  }

  render() {
    const name = this.props.name;

    return (
        <Paper>
          <TextField
            underlineShow={false}
            style={styles.textField}
            hintText="Title"
            floatingLabelText="Title"
            value={name ? name : ''}
            onChange={this.changeName}
          />
          <DatePicker
            style={styles.textField}
            hintText="Start date"
            floatingLabelText="Start date"
            value={this.props.startDate}
            onChange={this.changeStartDate}/>
          <TimePicker
            style={styles.textField}
            hintText="Start time"
            floatingLabelText="Start time"
            value={this.props.startTime}
            onChange={this.changeStartTime}/>
        </Paper>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaItem);