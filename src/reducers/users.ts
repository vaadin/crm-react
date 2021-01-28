import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { User } from '../types';

export interface UsersState {
  data: User[];
}

const initialState: UsersState = {
  data: []
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state: UsersState, action: PayloadAction<[]>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getUsers = (): AppThunk => async (dispatch) => {
  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/users`
  );
  dispatch(slice.actions.getUsers(response.data));
};

export default slice;
