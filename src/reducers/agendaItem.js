import {
  AI_ACTION_MOUSE_OVER,
  AI_ACTION_MOUSE_OUT,
  AI_ACTION_NAV_DETAIL,
} from '../constants/actionTypes';
const defaultState = {
  isShowActions: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case AI_ACTION_MOUSE_OVER:
      return {...state, isShowActions:true, mouseOverId:action.payload};
    case AI_ACTION_MOUSE_OUT:
      return {...state, isShowActions:false, mouseOverId:null};

    default:
      return state;
  }

  return state;
};
