import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

// saga & reducer
import rootSaga from '../modules/sagas';
import rootReducer from '../modules/reducer';

// middleware
import logger from './middleware/logger';

export const makeStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
