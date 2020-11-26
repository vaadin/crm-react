import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Contact } from '../types/contact';

export interface ContactsState {
  data: Contact[];
}

const initialState: ContactsState = {
  data: []
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts(state: ContactsState, action: PayloadAction<[]>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getContacts = (): AppThunk => async (dispatch) => {
  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/contacts`
  );
  dispatch(slice.actions.getContacts(response.data));
};

export default slice;
