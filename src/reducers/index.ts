import { combineReducers } from 'redux';
import { reducer as contactReducer, ContactsState } from './contacts';
import { reducer as companiesReducer, CompaniesState } from './companies';
import { reducer as companyInfoReducer, CompanyInfoState } from './companyInfo';
import { reducer as userReducer, UsersState } from './users';
import { reducer as dealReducer, DealsState } from './deals';
import { reducer as noteReducer, NotesState } from './notes';

const rootReducer = combineReducers({
  contacts: contactReducer,
  companies: companiesReducer,
  companyInfo: companyInfoReducer,
  users: userReducer,
  deals: dealReducer,
  notes: noteReducer
});

export interface State {
  contacts: ContactsState;
  companies: CompaniesState;
  companyInfo: CompanyInfoState;
  users: UsersState;
  deals: DealsState;
  notes: NotesState;
}

export default rootReducer;
