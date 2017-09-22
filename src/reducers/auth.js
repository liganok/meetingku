import {
  AUTH_UPDATE_FIELD,
  AUTH_CHANGE_INDEX
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {

    case AUTH_UPDATE_FIELD:
      return {...state, [action.key]: action.value}
    case AUTH_CHANGE_INDEX:
      return {...state, tabIndex: action.value}
    default:
      return state
  }
};
