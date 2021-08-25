import { is } from 'typescript-is';
import { callApi } from 'utils/api-wrapper';
import {
  ERROR_RESPONSE_DATA,
  AddTopicRequest,
  AddTopicResponse,
  GetTopicsResponse,
  AddCommentRequest,
  AddCommentResponse,
  GetCommentsRequest,
  GetCommentsResponse,
  GetTopicResponse, WatchTopicResponse,
} from 'api/types';
import { PATHS } from './config';

export const forumAPI = {
  addTopic: async (data: AddTopicRequest): Promise<AddTopicResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.forum.addTopic,
        data,
      });

      if (response.data && is<AddTopicResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTopics: async (page = 1): Promise<GetTopicsResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        url: `${PATHS.forum.getTopics}?page=${page}`,
      });
      if (response.data && is<GetTopicsResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getTopic: async (id: number): Promise<GetTopicResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        url: `${PATHS.forum.getTopics}/${id}`,
      });
      if (response.data && is<GetTopicResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  watchTopic: async (id: number): Promise<WatchTopicResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        url: `${PATHS.forum.watchTopic}/${id}`,
      });
      if (response.data && is<WatchTopicResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  addComment: async (data: AddCommentRequest): Promise<AddCommentResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.forum.addComment,
        data,
      });

      if (response.data && is<AddCommentResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getComments: async (data: GetCommentsRequest): Promise<GetCommentsResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        data: {},
        url: `${PATHS.forum.getComments}/${data.topicId}?page=${data.page || 1}`,
      });

      if (response.data && is<GetCommentsResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
