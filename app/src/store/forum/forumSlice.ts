import {
  Comment, GetCommentsResponse, GetTopicsResponse, Topic,
} from 'api/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  getCommentsAsync,
  getTopicAsync,
  getTopicsAsync,
  setActiveCommentsPage,
  setActiveTopicId,
  setActiveTopicsPage,
  setActiveTopicTitle,
} from 'store/forum/forumActions';

type ForumState = {
  topics: {
    topicsList: Topic[]
    topicsCount: number
    topicsPagesCount: number
    activeTopicId: number | undefined
    activeTopicTitle: string
    activeTopicsPage: number
  }
  comments: {
    commentsList: Comment[]
    commentsCount: number
    commentsPagesCount: number
    activeCommentsPage: number
  }
}

const initialState: ForumState = {
  topics: {
    topicsList: [],
    topicsCount: 0,
    topicsPagesCount: 0,
    activeTopicId: undefined,
    activeTopicTitle: 'undefined title',
    activeTopicsPage: 1,
  },
  comments: {
    commentsList: [],
    commentsCount: 0,
    commentsPagesCount: 0,
    activeCommentsPage: 1,
  },
};

const updateTopicsList = (state: ForumState, payload: GetTopicsResponse) => {
  state.topics.topicsList = payload.results;
  state.topics.topicsCount = payload.totalItems;
  state.topics.topicsPagesCount = payload.totalPages;
};

const updateCommentsList = (state: ForumState, payload: GetCommentsResponse) => {
  state.comments.commentsList = payload.results;
  state.comments.commentsCount = payload.totalItems;
  state.comments.commentsPagesCount = payload.totalPages;
};

const updateActiveTopicId = (state: ForumState, payload: number) => {
  state.topics.activeTopicId = payload;
};

const updateActiveTopicTitle = (state: ForumState, payload: string) => {
  state.topics.activeTopicTitle = payload;
};

const updateActiveTopicPage = (state: ForumState, payload: number) => {
  state.topics.activeTopicsPage = payload;
};

const updateActiveCommentsPage = (state: ForumState, payload: number) => {
  state.comments.activeCommentsPage = payload;
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopicsAsync.fulfilled, (state, action) => {
      updateTopicsList(state, action.payload);
    });
    builder.addCase(getTopicAsync.fulfilled, (state, action) => {
      updateActiveTopicTitle(state, action.payload.title);
    });
    builder.addCase(getCommentsAsync.fulfilled, (state, action) => {
      updateCommentsList(state, action.payload);
    });
    builder.addCase(setActiveTopicId, (state, action) => {
      updateActiveTopicId(state, action.payload);
    });
    builder.addCase(setActiveTopicTitle, (state, action) => {
      updateActiveTopicTitle(state, action.payload);
    });
    builder.addCase(setActiveTopicsPage, (state, action) => {
      updateActiveTopicPage(state, action.payload);
    });
    builder.addCase(setActiveCommentsPage, (state, action) => {
      updateActiveCommentsPage(state, action.payload);
    });
  },
});

export const forumReducer = forumSlice.reducer;
export const forumActions = forumSlice.actions;
