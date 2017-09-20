import {
  H_ACTION_TOGGLE,
  H_ACTION_MOUSEOVER,
  H_ACTION_MOUSEOUT,
} from '../constants/actionTypes';
const defaultState = {
  isShowDrawer: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case H_ACTION_TOGGLE:
      return {...state, isShowDrawer:!state.isShowDrawer,};
    case H_ACTION_MOUSEOVER:
      return {...state, isShowUserDetail:true};
    case H_ACTION_MOUSEOUT:
      return {...state, isShowUserDetail:false};
    default:
      return state;
  }

  return state;
};
