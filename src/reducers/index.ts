import { combineReducers } from 'redux';
import { reducer as contactReducer } from './contacts';

const rootReducer = combineReducers({
  contacts: contactReducer
});

export default rootReducer;
