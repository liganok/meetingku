import {UPDATE_FIELD_AGENDA} from '../constants/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FIELD_AGENDA:
      return { ...state, [action.key]: action.value };

    default:
      return state;
  }

  return state;
};
