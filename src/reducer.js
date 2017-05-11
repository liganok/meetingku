import { combineReducers } from 'redux';

import home from './reducers/home';
import settings from './reducers/settings';

const rootReducer = combineReducers({
  home : home,
  settings : settings
});

export default rootReducer;