import { combineReducers } from 'redux';
import { reducer as contactReducer, ContactsState } from './contacts';
import { reducer as companiesReducer, CompaniesState } from './companies';

const rootReducer = combineReducers({
  contacts: contactReducer,
  companies: companiesReducer
});

export interface State {
  contacts: ContactsState;
  companies: CompaniesState;
}

export default rootReducer;
