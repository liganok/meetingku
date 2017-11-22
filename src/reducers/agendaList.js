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
        agendas: action.payload.data,
        currentPage: 0
      }
    case GET_LIST_TEMPLATE:
      return {
        ...state,
        templates: action.payload.data,
        currentPage: 0
      }
    case GET_LIST_TRASH:
      return {
        ...state,
        trash: action.payload.data,
        currentPage: 0
      }
    case LOGOUT:
      return {
        ...state,
        agendas: null,
        trash: null
      }

    default:
      return state
  }
};