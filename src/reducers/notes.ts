import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils';
import type { AppThunk } from '../store';
import type { Note } from '../types';

export interface NotesState {
  data: Note[];
}

const initialState: NotesState = {
  data: []
};

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getNotes(state: NotesState, action: PayloadAction<[]>) {
      state.data = action.payload;
    }
  }
});

export const { reducer } = slice;

export const getNotes = (dealId?: number): AppThunk => async (dispatch) => {
  if (!dealId) {
    dispatch(slice.actions.getNotes([]));
    return;
  }
  const response = await axios.get<[]>(
    `${process.env.REACT_APP_BASE_API}/notes?deal=${dealId}`
  );
  dispatch(slice.actions.getNotes(response.data));
};

export default slice;
