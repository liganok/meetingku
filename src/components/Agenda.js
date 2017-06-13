import React from 'react';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import {UPDATE_FIELD_AGENDA} from '../constants/actionTypes';

import FlatButton from 'material-ui/FlatButton';

const style = {
  root: {
    margin: 20,
  },

  text:{
    margin: 10
  }
};

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  onChangeName: value => dispatch({type: UPDATE_FIELD_AGENDA, key: 'name', value}),

});

class Agenda extends React.Component {
  constructor() {
    super();
    this.changeName = ev => this.props.onChangeName(ev.target.value);
  }

  render() {
    return (
      <Paper style={style.root}>
        <TextField
          style={style.root}
          floatingLabelText="Agenda name"
          value={this.props.name}
          onChange={this.changeName}
        />
      </Paper>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);