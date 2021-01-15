import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Contact } from '../types';

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

export const getContacts = (filter?: string): AppThunk => async (dispatch) => {
  const filterUrl = filter ? `?search=${filter}` : '';
  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/contacts${filterUrl}`
  );
  dispatch(slice.actions.getContacts(response.data));
};

export default slice;
