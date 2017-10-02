import {
  GET_LIST_AGENDA,
  GET_LIST_TEMPLATE,
  GET_LIST_TRASH,
  LOGOUT
} from '../constants/actionTypes'

const defaultState = {
  agendas: null,
  currentPage: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST_AGENDA:
      return {
        ...state,
        agendas: action.payload.agendas,
        currentPage: 0
      }
    case GET_LIST_TEMPLATE:
      return {
        ...state,
        templates: action.payload.templates,
        currentPage: 0
      }
    case GET_LIST_TRASH:
      return {
        ...state,
        trash: action.payload.agendas,
        currentPage: 0
      }
    case LOGOUT:
      return {
        ...status,
        agendas: null,
        trash: null
      }

    default:
      return state
  }

  return state
};
