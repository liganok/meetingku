'use strict';

export default (state = {}, action) => {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {
        ...state,
        hello:'test'
      };
    case 'HOME_PAGE_UNLOADED':
      return {};
  }

  return state;
};