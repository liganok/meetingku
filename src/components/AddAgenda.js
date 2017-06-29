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
  root: {},
  hintText: {
    padding: 15,
  },

  doneButton: {
    //float:'right',

  },

  dialog: {}
};


class AddAgenda extends React.Component {
  render() {
    return (
      <div style={styles.root}>
        <Paper >
          <div style={styles.hintText} onClick={(ev) => this.props.history.push('/new')}>
            Add an agenda
          </div>
        </Paper>
      </div>
    );
  }
}
;

export default AddAgenda;