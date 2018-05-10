import * as types from '../constants/actionTypes';

const defaultState = {
  timer: 0,
  status: 'todo', //same as status bar
};

function computeStartTime(agenda) {
  if (!agenda.subItems) {
    Object.assign(agenda, { startedPlayAt: 1 });
  } else {
    agenda.subItems.forEach((item, index) => {
      if (!index) {
        if (!agenda.startedPlayAt) {
          agenda.startedPlayAt = 1;
        }
        Object.assign(item, { startedPlayAt: parseInt(agenda.startedPlayAt) });
      } else {
        Object.assign(item, { startedPlayAt: parseInt(agenda.subItems[index - 1].startedPlayAt + agenda.subItems[index - 1].duration * 60) });
      }
      computeStartTime(item);
    });
  }

  return agenda;
}

function getInitialTimerandStatus(currentAgenda){
  let timer = 0, status = 'todo'
  let startTime = new Date(currentAgenda.startedAt).getTime()
  let nowTime = new Date().getTime()

  if (nowTime >= startTime && nowTime <= (startTime + currentAgenda.duration * 60000)) {
    timer = parseInt((nowTime - startTime) / 1000)
    status = 'inProcess'
  }
  if (nowTime > (startTime + currentAgenda.duration * 60000)) {
    timer = currentAgenda.duration * 60+ 10
    status = 'done'
  }
  return {timer,status}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.AP_ACTION_GET_DETAIL:
      let agenda = computeStartTime(action.payload.error ? null : action.payload.data)
      let initialTimerandStatus = getInitialTimerandStatus(agenda)
      return { ...state, currentAgenda: agenda, timer:initialTimerandStatus.timer,status:initialTimerandStatus.status };
    case types.AP_ACTION_UPDATE_TIMER:
      return { ...state, timer: state.timer +1 };
    case types.AP_ACTION_UPDATE_STATUS:
      return { ...state, status: action.payload };
    case types.AP_ACTION_MOUSE_OVER:
      return { ...state, mouseOverId: action.payload }
    case types.AP_ACTION_MOUSE_OUT:
      return { ...state, mouseOverId: '' }
    case types.AP_ACTION_LOCAL_START:
      let localAgenda = state.currentAgenda
      localAgenda.startedAt = new Date().toISOString()
      initialTimerandStatus = getInitialTimerandStatus(localAgenda)
      return { ...state, currentAgenda: localAgenda, timer: initialTimerandStatus.timer, status: initialTimerandStatus.status };

    default:
      return state;
  }
};
