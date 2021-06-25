import { PATHS } from './config';

export const resourcesAPI = {

  getResourceURL(url: string) {
    const temp = url.startsWith('/') ? url : `/${url}`;
    return `${PATHS.resources.getUrl}/${temp}`;
  },

};
