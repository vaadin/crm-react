import { combineReducers } from 'redux';

const appReducer = combineReducers({});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
