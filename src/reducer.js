import { combineReducers } from 'redux';

import home from './reducers/home';
import settings from './reducers/settings';
import common from './reducers/common';
import auth from './reducers/auth';
import agenda from './reducers/agenda';
import agendaList from './reducers/agendaList';


export default combineReducers({
  common,
  auth,
  home,
  settings,
  agenda,
  agendaList
});