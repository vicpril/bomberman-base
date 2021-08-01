import { createSlice } from '@reduxjs/toolkit';
import { GetLeaderboardResponse, Leader } from 'api/types';
import { getLeaderboardAsync } from 'store/leaderboard/leaderboardActions';

type LeaderboardState = {
  leaderboard: Leader[]
};

const initialState: LeaderboardState = {
  leaderboard: [],
};

const updateLeaderboard = (state: LeaderboardState, payload: GetLeaderboardResponse) => {
  state.leaderboard = payload.map((leader) => leader.data);
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLeaderboardAsync.fulfilled, (state, action) => {
      updateLeaderboard(state, action.payload);
    });
  },
});

export const leaderboardReducer = leaderboardSlice.reducer;
