import React from 'react';
import {connect} from 'react-redux';

import agent from '../agent';


import {
  AGENDA_UPDATE_FIELD,
  AGENDA_SAVE,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
} from '../constants/actionTypes';


const mapStateToProps = state => ({...state.agendaDetail});
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({type: AGENDA_GET_DETAIL, payload}),
  onSaveAgenda: agenda => dispatch({type: AGENDA_SAVE, payload: agent.Agenda.save(agenda)}),
  onChangeField: (id, key, value) => dispatch({type: AGENDA_UPDATE_FIELD, id: id, key: key, value: value}),
  onMenuItemTap: (id,value) => dispatch({type: AGENDA_MENU_ITEM_TAP,id:id, value:value}),

});


class AgendaDetail extends React.Component {

  componentWillMount() {
    if(this.props.match.params.id){
      this.props.onLoad(agent.Agenda.get(this.props.match.params.id));
    }
  }

  handleSaveAgenda() {
      this.props.onSaveAgenda(this.props.currentAgenda);
  }


  render() {

    const currentAgenda = this.props.currentAgenda;
    if (!currentAgenda) {
      return null;
    }


    return (
      <div>test</div>
    );
  }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail);