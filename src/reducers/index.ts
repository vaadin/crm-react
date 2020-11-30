import { combineReducers } from 'redux';
import { reducer as contactReducer, ContactsState } from './contacts';
import { reducer as companiesReducer, CompaniesState } from './companies';
import { reducer as CompanyInfoReducer, CompanyInfoState } from './companyInfo';

const rootReducer = combineReducers({
  contacts: contactReducer,
  companies: companiesReducer,
  companyInfo: CompanyInfoReducer
});

export interface State {
  contacts: ContactsState;
  companies: CompaniesState;
  companyInfo: CompanyInfoState;
}

export default rootReducer;
