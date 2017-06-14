import {
  AGENDA_UPDATE_FIELD,
  AGENDA_CREATE,
  AGENDA_SAVE,
  AGENDA_CLOSE_DIALOG} from '../constants/actionTypes';
const defaultState = {
  isAddAgenda: false,
  currentAgenda: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case AGENDA_UPDATE_FIELD:
      return { ...state, [action.key]: action.value };
    case AGENDA_CREATE:
      return {...state, isAddAgenda:true};
    case AGENDA_SAVE:
      return {...state, currentAgenda:action.payload.agenda,};
    case AGENDA_CLOSE_DIALOG:
      return {...state, isAddAgenda:false};

    default:
      return state;
  }

  return state;
};
