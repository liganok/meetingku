import React from 'react';
import {connect} from 'react-redux';

import agent from '../agent';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';


import {
  AGENDA_UPDATE_FIELD,
  AGENDA_CREATE,
  AGENDA_SAVE,
  AGENDA_CLOSE_DIALOG
} from '../constants/actionTypes';

import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


const mapStateToProps = state => ({...state.agendaDetail});
const mapDispatchToProps = dispatch => ({
  onChangeName: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'name', value}),
  onChangeStartedAt: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'startedAt', value}),
  onChangeDuration: value => dispatch({type: AGENDA_UPDATE_FIELD, key: 'duration', value}),
  onCreateAgenda: () => dispatch({type: AGENDA_CREATE}),
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload: agent.Agenda.create(agenda)}),
  onChangeField: (id,key,value) => dispatch({type: AGENDA_UPDATE_FIELD,id:id, key:key,value:value}),


});

const styles = {
  root: {
    display:'flex',
    flexDirection:'column',
    padding: 10,
  },
  header: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },

  body: {

  },

  footer: {
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
  },

  headerText:{
    bold:true,
  },

  subHeaderText:{
    fontSize:'14px',
  },

  time:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },

  datePicker:{
    width:75,
    fontSize:'9px'
  },

  timePicker:{
    width:50,
    fontSize:'9px'
  },

  duration:{
    fontSize:'15px',
    paddingLeft:'5px',
  }
};

class AgendaDetail extends React.Component {
  constructor() {
    super();
    this.changeName = ev => this.props.onChangeName(ev.target.value);
    this.changeStartedAt = (ev, data) => this.props.onChangeStartedAt(data);

    this.state = {
      isAddAgenda: false,
    };
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

  renderComponent(agenda){
  let componentArr = [];
  if(typeof(agenda.subItems[0])=='undefined'){
    componentArr.push(
      <TextField
        key={agenda.id}
        style={styles.root}
        hintText="Name"
        value={agenda.name}
        onChange={(ev)=>{this.props.onChangeField(agenda.id,'name',ev.target.value)}}
      />
    );
    return componentArr;
  }else{
    componentArr.push(
      <TextField
        key={agenda.id}
        style={styles.root}
        hintText="Name"
        value={agenda.name}
        onChange={(ev)=>{this.props.onChangeField(agenda.id,'name',ev.target.value)}}
      />
    );
    agenda.subItems.forEach(item=>{
      componentArr.push(this.renderComponent(item));
    });
    return componentArr;
  }
}



  render() {
    const name = this.props.currentAgenda.name;

    return (
      <Paper zDepth={2} style={styles.root}>
        <div style={styles.header}>
          <TextField
            style={styles.headerText}
            hintText="Name"
            value={name ? name : ''}
            onChange={this.changeName}
          />
          <div style={styles.time}>
            <DatePicker
              textFieldStyle={styles.datePicker}
              hintText="Start"
              value={this.props.startedAt}
              onChange={this.changeStartedAt}/>
            <TimePicker
              textFieldStyle={styles.timePicker}
              value={this.props.startedAt}
              onChange={this.changeStartedAt}/>
            <label style={styles.duration}>30m</label>
          </div>
        </div>

        <div style={styles.body}>
          {this.renderComponent(this.props.currentAgenda)}
        </div>

        <div style={styles.footer}>
          <RaisedButton label="Save" primary={true} onTouchTap={(ev)=>this.props.history.push('/login')} />
        </div>

      </Paper>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail);