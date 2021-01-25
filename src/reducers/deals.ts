import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Deal } from '../types';

export interface DealsState {
  data: Deal[];
  error: boolean;
}

const initialState: DealsState = {
  data: [],
  error: false
};

const slice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    getDeals(state: DealsState, action: PayloadAction<[]>) {
      state.data = action.payload;
      state.error = false;
    },
    updateDeal(state: DealsState, action: PayloadAction<any>) {
      if (action.payload === 'failure') {
        state.error = true;
      } else {
        state.data = action.payload;
        state.error = false;
      }
    }
  }
});

export const { reducer } = slice;

export const getDeals = (): AppThunk => async (dispatch) => {
  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/deals`
  );
  dispatch(slice.actions.getDeals(response.data));
};

export const updateDeal = (id: number, data: Deal): AppThunk => async (
  dispatch
) => {
  console.log(id, data);
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_API}/deal/${id}`,
    data
  );
  dispatch(slice.actions.updateDeal(response.data));
};

export default slice;
