import * as types from '../constants/actionTypes';
import { getOAuthURL } from '../utils/oAuth'

const defaultState = {
  appName: 'Meetingku',
  token: null,
  isShowDrawer: false,
  msg: {
    status: '', message: '',
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.data : null
      };
    case types.REDIRECT:
      return { ...state, redirectTo: action.value };
    case types.LOGOUT:
      return { ...state, redirectTo: '/auth', token: null, currentUser: null };
    case types.LOGIN:
      return {
        ...state,
        token: action.error ? null : action.payload.data.token,
        currentUser: action.error ? null : action.payload.data,
        redirectTo: action.error ? null : '/agenda',
        authError: action.error ? action.payload.error.message : null
      };
    case types.REGISTER:
      return {
        ...state,
        token: action.error ? null : action.payload.data.token,
        currentUser: action.error ? null : action.payload.data,
        redirectTo: action.error ? null : '/agenda',
        authError: action.error ? action.payload.error.message : null
      };
    case types.ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    case types.ASYNC_END:
      return {
        ...state,
        inProgress: false
      };
    case types.SHOW_MSG:
      return {
        ...state,
        msg: action.payload,
        isShowMsg: true
      };
    case types.CLOSE_MSG:
      return {
        ...state,
        isShowMsg: false
      };
    case types.H_ACTION_TOGGLE:
      return { ...state, isShowDrawer: !state.isShowDrawer, }
    case types.AGENDA_SAVE:
      let id = action.payload.data.id
      return {
        ...state,
        redirectTo: id ? `/agenda/detail/${id}` : null
      }
    case types.AUTH_START_OAUTH:
      return { ...state, oAuthInfo: { type: action.payload }, redirectTo: getOAuthURL(action.payload) }
    case types.UPDATE_APP_NAME:
      return {
        ...state,
        appName: action.payload
      };
    default:
      return state;
  }
};
