import { createSlice } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: []
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {}
});

export const { reducer } = slice;

export default slice;
