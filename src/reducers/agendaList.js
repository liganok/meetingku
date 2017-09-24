import {
  GET_AGENDALIST,
  AGENDALIST_NAV_DETAIL
} from '../constants/actionTypes';

const defaultState = {
  agendas: null,
  currentPage:0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_AGENDALIST:
      return {
        ...state,
        agendas:action.payload.agendas,
        currentPage:0
      };

    default:
      return state;
  }

  return state;
};
