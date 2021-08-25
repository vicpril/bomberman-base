import { RootState } from 'store/store';

export const selectTopics = (state: RootState) => state.forum.topics;
export const selectComments = (state: RootState) => state.forum.comments;
