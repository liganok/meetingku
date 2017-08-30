import {
  AP_ACTION_GET_DETAIL,
  AP_ACTION_UPDATE_TIMER,
  AP_ACTION_UPDATE_CLOCK,
} from '../constants/actionTypes';

const defaultState = {
  timer: 0,
  currentAgenda: {
    id: "NEW135259b216dbf27294451",
    startedAt:'2017-07-13T07:24:39.025Z',
    duration: 0,
    sequence: 0,
    subItems:[],
  }
};

function computeStartTime (agenda) {
  if(!agenda.subItems){
    Object.assign(agenda,{startedPlayAt:0});
  }else{
    agenda.subItems.forEach((item,index)=>{
      if(!index){
        if(!agenda.startedPlayAt){
          agenda.startedPlayAt = 0;
        }
        Object.assign(item,{startedPlayAt:parseInt(agenda.startedPlayAt)});
      }else{
        Object.assign(item,{startedPlayAt:parseInt(agenda.subItems[index-1].startedPlayAt+agenda.subItems[index-1].duration*60)+1});
      }
      computeStartTime(item);
    });
  }

  return agenda;
}


export default (state=defaultState, action) => {
  switch (action.type) {
    case AP_ACTION_GET_DETAIL:
      let agenda = computeStartTime(action.payload)
      return {...state,currentAgenda:agenda};
    case AP_ACTION_UPDATE_TIMER:
      return {...state, timer: action.payload};
    case AP_ACTION_UPDATE_CLOCK:
      return {...state, clock: action.payload};
    default:
      return state;
  }

  return state;
};
