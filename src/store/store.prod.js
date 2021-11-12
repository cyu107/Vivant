import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

// saga & reducer
import rootSaga from '../modules/sagas';
import rootReducer from '../modules/reducer';

export const makeStore = (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore);
