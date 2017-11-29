import agent from './agent';
import * as types from './constants/actionTypes'
import {makeCopy} from './utils/agenda'

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: types.ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;


    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch({ type: types.ASYNC_END, promise: action.payload });
        store.dispatch(action);
        if (action.type === types.AGENDA_SAVE) {
          store.dispatch({ type: types.SHOW_MSG, payload: res });
          store.dispatch({ type: types.AGENDA_GET_DETAIL, payload: agent.Agenda.getAgendaDetail(action.payload.data.id) });
        }
        if (action.type === types.AI_ACTION_LOGIC_DEL) {
          store.dispatch({ type: types.SHOW_MSG, payload: res });
          store.dispatch({ type: types.GET_LIST_AGENDA, payload: agent.Agenda.getAgendas(0) })
        }
        
        if (action.type === types.AI_ACTION_LOGIC_DEL_UNDO) {
          store.dispatch({ type: types.SHOW_MSG, payload: res });
          store.dispatch({ type: types.GET_LIST_TRASH, payload: agent.Agenda.getTrash(0) })
        }

        if (action.type === types.AI_ACTION_DEL) {
          store.dispatch({ type: types.SHOW_MSG, payload: res });
          store.dispatch({ type: types.GET_LIST_TRASH, payload: agent.Agenda.getTrash(0) })
        }
        if (action.type === types.AI_ACTION_COPY) {
          action.payload = makeCopy(res.data)
          store.dispatch({ type: types.REDIRECT, value: '/agenda/new' })
        }
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: types.ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === types.REGISTER || action.type === types.LOGIN) {
    if (!action.error && action.payload.status === 200) {
      window.localStorage.setItem('jwt', action.payload.data.token);
      agent.setToken(action.payload.data.token);
    }
  } else if (action.type === types.LOGOUT) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
