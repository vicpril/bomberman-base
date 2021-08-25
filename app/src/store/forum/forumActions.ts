import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { forumAPI } from 'api/forum';
import { AddCommentRequest, AddTopicRequest, GetCommentsRequest } from 'api/types';
import { setIsLoadingShown } from 'store/requestStatus/requestStatusActions';

export enum ForumActionType {
  GET_TOPICS = 'forum/getTopicsAsync',
  GET_TOPIC = 'forum/getTopicAsync',
  ADD_TOPIC = 'forum/addTopic',
  DELETE_TOPIC = 'forum/deleteTopic',
  GET_COMMENTS = 'forum/getComments',
  ADD_COMMENT = 'forum/addComment',
  DELETE_COMMENT = 'forum/deleteComment',
  WATCH_TOPIC = 'forum/watchTopic',
}

export const getTopicsAsync = createAsyncThunk(
  ForumActionType.GET_TOPICS,
  async (page: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.getTopics(page);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const getTopicAsync = createAsyncThunk(
  ForumActionType.GET_TOPIC,
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.getTopic(id);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const addTopicAsync = createAsyncThunk(
  ForumActionType.ADD_TOPIC,
  async (data: AddTopicRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.addTopic(data);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const getCommentsAsync = createAsyncThunk(
  ForumActionType.GET_COMMENTS,
  async (data: GetCommentsRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.getComments(data);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const addCommentAsync = createAsyncThunk(
  ForumActionType.ADD_COMMENT,
  async (data: AddCommentRequest, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.addComment(data);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const watchTopicAsync = createAsyncThunk(
  ForumActionType.WATCH_TOPIC,
  async (id: number, thunkAPI) => {
    thunkAPI.dispatch(setIsLoadingShown(true));
    try {
      return await forumAPI.watchTopic(id);
    } finally {
      thunkAPI.dispatch(setIsLoadingShown(false));
    }
  },
);

export const setActiveTopicId = createAction<number>('setActiveTopicId');
export const setActiveTopicTitle = createAction<string>('setActiveTopicTitle');
export const setActiveTopicsPage = createAction<number>('setActiveTopicsPage');
export const setActiveCommentsPage = createAction<number>('setActiveCommentsPage');
