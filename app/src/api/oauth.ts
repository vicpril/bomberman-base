import { is } from 'typescript-is';
import { callApi } from 'utils/api-wrapper';
import { PATHS } from './config';
import {
  ERROR_RESPONSE_DATA, OAuthServiceIdRequest, OAuthServiceIdResponse, OauthSignInRequest, OauthSignInResponse,
} from './types';

export const oauthAPI = {
  getServiceId: async (data: OAuthServiceIdRequest): Promise<OAuthServiceIdResponse> => {
    try {
      const response = await callApi({
        method: 'get',
        url: PATHS.oauth.getServiceId,
        data,
      });

      if (response.data && is<OAuthServiceIdResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signIn: async (data: OauthSignInRequest): Promise<OauthSignInResponse> => {
    try {
      const response = await callApi({
        method: 'post',
        url: PATHS.oauth.signIn,
        data,
      });

      if (response.data && is<OauthSignInResponse>(response.data)) {
        return response.data;
      }
      throw new Error(ERROR_RESPONSE_DATA);
    } catch (error) {
      throw new Error(error.message);
    }
  },

};
