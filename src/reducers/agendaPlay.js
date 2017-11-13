import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
} from '../constants/actionTypes';

const defaultState = {
  timer: 0,
};

function computeStartTime (agenda) {
  if(!agenda.subItems){
    Object.assign(agenda,{startedPlayAt:1});
  }else{
    agenda.subItems.forEach((item,index)=>{
      if(!index){
        if(!agenda.startedPlayAt){
          agenda.startedPlayAt = 1;
        }
        Object.assign(item,{startedPlayAt:parseInt(agenda.startedPlayAt)});
      }else{
        Object.assign(item,{startedPlayAt:parseInt(agenda.subItems[index-1].startedPlayAt+agenda.subItems[index-1].duration*60)});
      }
      computeStartTime(item);
    });
  }

  return agenda;
}


export default (state=defaultState, action) => {
  switch (action.type) {
    case AP_ACTION_GET_DETAIL:
      let agenda = computeStartTime(action.payload.status ? action.payload.agenda : null)
      return {...state,currentAgenda:agenda};
    case AP_ACTION_UPDATE_TIMER:
      return {...state, timer: action.payload};
    default:
      return state;
  }
};
