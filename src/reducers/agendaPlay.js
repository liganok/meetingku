import * as types from '../constants/actionTypes';

const defaultState = {
  timer: 0,
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

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.AP_ACTION_GET_DETAIL:
      let agenda = computeStartTime(action.payload.error ? null : action.payload.data)
      return { ...state, currentAgenda: agenda, timer:0 };
    case types.AP_ACTION_UPDATE_TIMER:
      return { ...state, timer: action.payload };
    case types.AP_ACTION_MOUSE_OVER:
      return { ...state, mouseOverId: action.payload }
    case types.AP_ACTION_MOUSE_OUT:
      return { ...state, mouseOverId: '' }
    case types.AP_ACTION_LOCAL_START:
      let localAgenda = state.currentAgenda
      localAgenda.startedAt = new Date().toISOString()
      return { ...state, currentAgenda: JSON.parse(JSON.stringify(localAgenda))}
    default:
      return state;
  }
};
