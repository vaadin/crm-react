import { combineReducers } from 'redux';
import { reducer as contactReducer, ContactsState } from './contacts';
import { reducer as companiesReducer, CompaniesState } from './companies';
import { reducer as companyInfoReducer, CompanyInfoState } from './companyInfo';
import { reducer as userReducer, UsersState } from './users';
import { reducer as dealReducer, DealsState } from './deals';

const rootReducer = combineReducers({
  contacts: contactReducer,
  companies: companiesReducer,
  companyInfo: companyInfoReducer,
  users: userReducer,
  deals: dealReducer
});

export interface State {
  contacts: ContactsState;
  companies: CompaniesState;
  companyInfo: CompanyInfoState;
  users: UsersState;
  deals: DealsState;
}

export default rootReducer;
