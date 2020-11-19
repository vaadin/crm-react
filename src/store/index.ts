import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { AppState } from './types';
import rootReducer from '../reducers';

// initialValues
const init: AppState = {};

export default function store(initialState: AppState = init) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  return {
    ...createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    ),
    runSaga: sagaMiddleware.run
  };
}
