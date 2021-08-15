import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRequestProps } from 'api/types';

const axiosInstance = axios.create({});

export const callApi: (params: ApiRequestProps) => Promise<AxiosResponse> = async ({
  method,
  url,
  data,
  params,
  formData = false,
}) => {
  const requestConfig: AxiosRequestConfig = {
    headers: {},
    method,
    url,
    withCredentials: true,
  };

  if (formData) {
    requestConfig.headers['Content-Type'] = 'multipart/form-data';
  }

  if (data) {
    requestConfig.data = data;
  }

  if (params) {
    requestConfig.params = params;
  }

  // TODO разлогинивать на 401 статус

  const response = await axiosInstance(requestConfig)
    .catch((error) => {
      if (error.response?.data?.reason) {
        throw new Error(error.response.data.reason);
      } else {
        throw new Error(error.message);
      }
    });
  return response;
};
