import { createSlice } from '@reduxjs/toolkit';
import { Leader } from 'api/types';

type LeaderboardState = {
  leaderboard: Leader[]
};

const initialState: LeaderboardState = {
  leaderboard: [],
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    update(state, action) {
      state.leaderboard = action.payload;
    },
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
