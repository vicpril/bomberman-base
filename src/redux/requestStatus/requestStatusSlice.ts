import { createSlice } from '@reduxjs/toolkit';
import { setIsLoadingShown } from './requestStatusActions';

type RequestStatusState = {
  isLoadingShown: boolean
}

const initialState: RequestStatusState = {
  isLoadingShown: false,
};

export const requestStatusSlice = createSlice({
  name: 'requestStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setIsLoadingShown, (state, action) => {
        state.isLoadingShown = action.payload;
      });
  },
});

export const requestStatusReducer = requestStatusSlice.reducer;
