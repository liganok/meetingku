import * as types from '../constants/actionTypes';

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
      return { ...state, redirectTo: '/login', token: null, currentUser: null };
    case types.LOGIN:
      return {
        ...state,
        redirectTo: action.error || action.payload.status !== 200 ? null : '/agenda',
        token: action.error || action.payload.status !== 200 ? null : action.payload.user.token,
        currentUser: action.error || action.payload.status !== 200 ? null : action.payload.user
      };
    case types.REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/login',
        token: null,
        currentUser: null
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
      return { ...state, isShowDrawer: !state.isShowDrawer, };
    default:
      return state;
  }
};
