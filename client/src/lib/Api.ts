import axios, { AxiosRequestConfig, Method } from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000/",
});

export const ApiRequest = async <T>(
  method: Method,
  endpoint: string,
  data?: unknown,
  params?: object
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint,
      data: data ?? undefined, 
      params: params ?? undefined,
    };

    const res = await Api.request<T>(config);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`API ${method} Error (${endpoint}):`, error.response?.data || error.message);
    } else {
      console.error(`Unexpected API Error (${endpoint}):`, error);
    }
    throw error;
  }
};
