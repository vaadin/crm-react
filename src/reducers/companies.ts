import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Company } from '../types';

export interface CompaniesState {
  data: Company[];
  countries: string[];
}

const initialState: CompaniesState = {
  data: [],
  countries: []
};

const slice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    getCompanies(state: CompaniesState, action: PayloadAction<Company[]>) {
      state.data = action.payload;
    },
    getCountries(state: CompaniesState, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getCompanies = (filter?: string): AppThunk => async (dispatch) => {
  const filterUrl = filter ? `?search=${filter}` : '';
  const response = await axios.get<Company[]>(
    `${process.env.REACT_APP_BASE_API}/companies${filterUrl}`
  );
  dispatch(slice.actions.getCompanies(response.data));
};

export const getCountries = (): AppThunk => async (dispatch) => {
  const response = await axios.get<string[]>(
    `${process.env.REACT_APP_BASE_API}/countries`
  );
  dispatch(slice.actions.getCountries(response.data));
};

export default slice;
