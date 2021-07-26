import { createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardAPI } from 'api/leaderboard';
import { AddLeaderRequest, GetLeaderboardRequest } from 'api/types';
import { setIsLoadingShown } from 'store/requestStatus/requestStatusActions';

export enum LeaderboardActionType {
  GET_LEADERBOARD = 'leaderboard/getLeaderboardAsync',
  ADD_LEADER = 'leaderboard/addLeaderAsync'
}

export const addLeaderAsync = createAsyncThunk(
  LeaderboardActionType.ADD_LEADER,
  async (data: AddLeaderRequest) => {
    const leaderboard = await leaderboardAPI.addLeader(data);
    return leaderboard;
  },
);

export const getLeaderboardAsync = createAsyncThunk(
  LeaderboardActionType.GET_LEADERBOARD,
  async (data: GetLeaderboardRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      const leaderboard = await leaderboardAPI.getLeaderboard(data);
      return leaderboard;
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);
