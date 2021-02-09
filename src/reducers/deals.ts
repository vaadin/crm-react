import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Deal, FilterData } from '../types';

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
      const { data, isActive } = action.payload;
      if (data === 'failure') {
        state.error = true;
      } else {
        const idx = state.data.findIndex((item) => item.id === data.id);
        if (isActive && ['ClosedWon', 'ClosedLost'].includes(data.status)) {
          state.data.splice(idx, 1);
        } else {
          state.data[idx].status = data.status;
        }
        state.error = false;
      }
    }
  }
});

export const { reducer } = slice;

export const getDeals = (filterData: FilterData): AppThunk => async (
  dispatch
) => {
  const { company, contact, user, maxDeal, minDeal, state } = filterData;
  let filterURL = '';
  if (
    company.length > 0 ||
    contact.length > 0 ||
    user.length > 0 ||
    minDeal ||
    maxDeal ||
    state
  ) {
    filterURL += '?';
  }
  if (company.length > 0) {
    filterURL += `company=${company.toString()}&`;
  }
  if (contact.length > 0) {
    filterURL += `contact=${contact.toString()}&`;
  }
  if (user.length > 0) {
    filterURL += `user=${user.toString()}&`;
  }
  if (minDeal) {
    filterURL += `min=${minDeal}&`;
  }
  if (maxDeal) {
    filterURL += `max=${maxDeal}&`;
  }
  if (state) {
    filterURL += `active=${state}&`;
  }
  filterURL = filterURL.substr(0, filterURL.length - 1);

  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/deals${filterURL}`
  );
  dispatch(slice.actions.getDeals(response.data));
};

export const updateDeal = (
  id: number,
  isActive: boolean,
  data: Deal
): AppThunk => async (dispatch) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_API}/deal/${id}`,
    data
  );
  dispatch(slice.actions.updateDeal({ data: response.data, isActive }));
};

export default slice;
