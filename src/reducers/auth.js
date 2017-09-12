import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {

    case UPDATE_FIELD_AUTH:
      return {...state, [action.key]: action.value}

    default:
      return state
  }
};
