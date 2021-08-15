import { oauthAPI } from 'api/oauth';
import { REDIRECT_URI_OAUTH } from './config';

const getServiceId = async (): Promise<string> => {
  try {
    const response = await oauthAPI.getServiceId({ redirect_uri: REDIRECT_URI_OAUTH });
    return response.service_id;
  } catch (error) {
    throw new Error(error);
  }
};

export const OAuthController = {

  async getOAuthLink(): Promise<string> {
    try {
      const serciceId = await getServiceId();
      return 'https://oauth.yandex.ru/authorize'
        + '?response_type=code'
        + `&client_id=${serciceId}`
        + `&redirect_uri=${REDIRECT_URI_OAUTH}`;
    } catch (error) {
      throw new Error(error);
    }
  },

  async signIn(code: string) {
    try {
      await oauthAPI.signIn({
        code,
        redirect_uri: REDIRECT_URI_OAUTH,
      });

      // TODO dispatch get user info && isAuth = true
    } catch (error) {
      throw new Error(error);
    }
  },

};
