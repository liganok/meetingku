import { combineReducers } from 'redux';

import settings from './reducers/settings';
import common from './reducers/common';
import auth from './reducers/auth';
import agenda from './reducers/agenda';
import agendaList from './reducers/agendaList';


export default combineReducers({
  common,
  auth,
  settings,
  agenda,
  agendaList
});