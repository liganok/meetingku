import {
  H_ACTION_TOGGLE
} from '../constants/actionTypes';
const defaultState = {
  isShowDrawer: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case H_ACTION_TOGGLE:
      return {...state, isShowDrawer:!state.isShowDrawer,};
    default:
      return state;
  }

  return state;
};
