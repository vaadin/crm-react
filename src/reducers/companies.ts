import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Companies } from '../types/companies';

export interface CompaniesState {
  data: Companies;
}

const initialState: CompaniesState = {
  data: {}
};

const slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    getCompanies(state: CompaniesState, action: PayloadAction<Companies>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getCompanies = (): AppThunk => async (dispatch) => {
  const response = await axios.get<Companies>(
    `${process.env.REACT_APP_BASE_API}/companies`
  );
  dispatch(slice.actions.getCompanies(response.data));
};

export default slice;
