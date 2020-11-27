import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Company } from '../types/companies';

export interface CompaniesState {
  data: Company[];
}

const initialState: CompaniesState = {
  data: []
};

const slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    getCompanies(state: CompaniesState, action: PayloadAction<Company[]>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getCompanies = (): AppThunk => async (dispatch) => {
  const response = await axios.get<Company[]>(
    `${process.env.REACT_APP_BASE_API}/companies`
  );
  dispatch(slice.actions.getCompanies(response.data));
};

export default slice;
