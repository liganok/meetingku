/**
 * Created by Administrator on 2017/4/28.
 */
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/index';
const store = createStore(reducer);

export default store;