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
      if (action.payload === 'failure') {
        state.error = true;
      } else {
        const updatedItem = action.payload;
        state.data[
          state.data.findIndex((item) => item.id === updatedItem.id)
        ] = updatedItem;
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
