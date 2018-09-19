import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import Api from '../services/api';
// import reduxFetch from './redux-fetch';

const sagaMiddleWare = createSagaMiddleware();
const composer =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const enhancements = composer(applyMiddleware(sagaMiddleWare));

const rootReducer = combineReducers({ root: state => state = {} });

const store = createStore(rootReducer, enhancements);

const api = new Api({
  fetch: window.fetch,
});

const sagaInjections = {
  api,
  dispatch: store.dispatch.bind(store),
  logger: window.console,
  window,
};

function* rootSaga() {
  yield all([]);
}

sagaMiddleWare.run(rootSaga);

export default store;
