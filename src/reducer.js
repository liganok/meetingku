import { combineReducers } from 'redux';

import settings from './reducers/settings';
import common from './reducers/common';
import auth from './reducers/auth';
import agendaDetail from './reducers/agendaDetail';
import agendaList from './reducers/agendaList';
import agendaItem from './reducers/agendaItem';


export default combineReducers({
  common,
  auth,
  settings,
  agendaDetail,
  agendaList,
  agendaItem,
});