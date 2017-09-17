import {
  AGENDA_UPDATE_FIELD,
  AGENDA_CREATE,
  AGENDA_SAVE,
  AGENDA_CLOSE_DIALOG,
  AGENDA_MENU_ITEM_TAP,
  AGENDA_GET_DETAIL,
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
} from '../constants/actionTypes';

const defaultState = {
  isAddAgenda: false,
  currentAgenda: {
    id: "NEW135259b216dbf27294451",
    startedAt:'2017-07-13T07:24:39.025Z',
    duration: 0,
    sequence: 0,
    subItems:[],
  }
};

function changeAgenda(sourceAgenda, id, key, value) {
  let targetAgenda = sourceAgenda;
  let isHasSubItem = (typeof (targetAgenda.subItems) !== 'undefined');
  if (targetAgenda.id === id) {
    Object.assign(targetAgenda, {
      [key]: value
    });
    return targetAgenda;
  } else {
    if (isHasSubItem) {
      let subItemTmp = [];
      targetAgenda.subItems.forEach(item => {
        subItemTmp.push(changeAgenda(item, id, key, value));
      });
      Object.assign(targetAgenda, {
        subItems: subItemTmp
      });
      return targetAgenda;
    } else {
      return targetAgenda;
    }
  }
}

function countDuration(sourceAgenda) {
  let agenda = sourceAgenda;
  let isHasSubItem = (typeof (agenda.subItems[0]) !== 'undefined');
  if(!isHasSubItem){
    agenda.duration = sourceAgenda.duration;
  }else{
    let duration = 0;
    agenda.subItems.forEach(item=>{
      duration = Number(duration) + Number(countDuration(item).duration);
    });
    agenda.duration = duration;
  }
  return agenda;
}

function addAgenda(sourceAgenda,id) {
  let targetAgenda = sourceAgenda;//JSON.parse( JSON.stringify(sourceAgenda) );
  if(targetAgenda.id === id){
    let count = targetAgenda.subItems.length + 1;
    let idNew = 'NEW'+targetAgenda.id+count;
    targetAgenda.subItems.push({id:idNew,duration:0,subItems:[]});
  }else {
    targetAgenda.subItems.forEach(item=>{
      addAgenda(item,id);
    });
  }

  return targetAgenda;
}

function removeAgenda(sourceAgenda,id) {
  let targetAgenda = sourceAgenda;
  let index = targetAgenda.findIndex(item=>{
    return item.id === id;
  });

  if(index !== -1){
    targetAgenda.splice(index,1);
  }else{
    targetAgenda.forEach(item=>{
      removeAgenda(item.subItems,id);
    });
  }

  return targetAgenda[0];
}


export default (state=defaultState, action) => {
  switch (action.type) {
    case AGENDA_GET_DETAIL:
      return {...state,currentAgenda:action.payload};
    case AGENDA_UPDATE_FIELD:
      let currentAgenda = changeAgenda(JSON.parse( JSON.stringify(state.currentAgenda)),action.id,action.key,action.value);
      if(action.key==='duration') {currentAgenda = countDuration(currentAgenda)};
      return {
        ...state,
        //[action.key]: action.value,
        currentAgenda:changeAgenda(currentAgenda,action.id,action.key,action.value)
      };
    case AGENDA_CREATE:
      return {...state, isAddAgenda: true};
    case AGENDA_SAVE:
      return {...state,};
    case AGENDA_MENU_ITEM_TAP:
      if(action.value === 'ADD'){
        state.currentAgenda = addAgenda(JSON.parse( JSON.stringify(state.currentAgenda) ),action.id);
      }
      if(action.value === 'DEL'){
        state.currentAgenda = removeAgenda([JSON.parse( JSON.stringify(state.currentAgenda))],action.id);
      }
      return {...state,};
    case AI_ACTION_MOUSE_OVER:
      return {...state, isShowActions:true, mouseOverId:action.payload};
    case AI_ACTION_MOUSE_OUT:
      return {...state, isShowActions:false, mouseOverId:null};
    default:
      return state;
  }

  return state;
};
