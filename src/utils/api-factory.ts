import { useFlag } from './useFlag';

export const useApiRequestFactory = (requestFunction: (data?: any)=>Promise<any>) => {
  const { flag: isLoading, on: startRequest, off: endRequest } = useFlag(false);

  const request = async (...params: any) => {
    startRequest();
    try {
      return await requestFunction(...params);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      endRequest();
    }
  };

  return {
    request,
    isLoading,
  };
};
