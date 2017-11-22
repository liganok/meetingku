import * as types from '../constants/actionTypes';
const defaultState = {
  isShowActions: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.AI_ACTION_MOUSE_OVER:
      return {...state, isShowActions:true, mouseOverId:action.payload};
    case types.AI_ACTION_MOUSE_OUT:
      return {...state, isShowActions:false, mouseOverId:null}
    default:
      return state;
  }
}
