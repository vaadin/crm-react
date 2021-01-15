import { combineReducers } from 'redux';
import { reducer as contactReducer, ContactsState } from './contacts';
import { reducer as companiesReducer, CompaniesState } from './companies';
import { reducer as companyInfoReducer, CompanyInfoState } from './companyInfo';
import { reducer as userReducer, UsersState } from './users';

const rootReducer = combineReducers({
  contacts: contactReducer,
  companies: companiesReducer,
  companyInfo: companyInfoReducer,
  users: userReducer
});

export interface State {
  contacts: ContactsState;
  companies: CompaniesState;
  companyInfo: CompanyInfoState;
  users: UsersState;
}

export default rootReducer;
