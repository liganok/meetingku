import * as types from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {

    case types.AUTH_UPDATE_FIELD:
      return { ...state, [action.key]: action.value, authError: null,}
    case types.AUTH_CHANGE_INDEX:
      return { ...state, authError:null, tabIndex: action.value}
    case types.LOGIN:
      return {
        ...state,
        authError: action.payload.status !== 200 ? action.payload.error.message : null
      };
    case types.REGISTER:
      return {
        ...state,
        authError: action.payload.status !== 200 ? action.payload.error.message : null
      };
    default:
      return state
  }
};
