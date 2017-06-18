import {
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  AGENDALIST_NAV_DETAIL,
  ASYNC_START,
  ASYNC_END,
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Meetingku',
  token: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/login', token: null, currentUser: null };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case AGENDALIST_NAV_DETAIL:
      const redirectUrl = `detail/${action.payload.id}`;
      return {
        ...state,
        redirectTo: redirectUrl
      };
    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      };
    case ASYNC_END:
      return {
        ...state,
        inProgress: false
      };
    default:
      return state;
  }
};
