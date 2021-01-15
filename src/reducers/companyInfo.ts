import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Companies } from '../types';

export interface CompanyInfoState {
  data: Companies;
}

const initialState: CompanyInfoState = {
  data: {}
};

const slice = createSlice({
  name: 'companyInfo',
  initialState,
  reducers: {
    getCompanyInfo(state: CompanyInfoState, action: PayloadAction<Companies>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getCompanyInfo = (): AppThunk => async (dispatch) => {
  const response = await axios.get<Companies>(
    `${process.env.REACT_APP_BASE_API}/company-info`
  );
  dispatch(slice.actions.getCompanyInfo(response.data));
};

export default slice;
