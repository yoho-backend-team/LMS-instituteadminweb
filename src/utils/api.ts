// src/utils/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';

// Load API URL from .env
const API_URL = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:3000';

// Create Axios instance with baseURL
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle API errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error - Status:', error.response.status);
      console.error('API Error - Data:', error.response.data);
    } else if (error.request) {
      console.error('API Error - No response received');
    } else {
      console.error('API Error - Message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Generic HTTP Client wrapper
export const HttpClient = {
  get: <T = any>(endpoint: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    
    console.log('GET Request:', endpoint, params, config);
return axiosInstance.get<T>(endpoint, { params, ...config });

  },

  post: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(endpoint, data, config);
  },

  put: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(endpoint, data, config);
  },

  patch: <T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.patch<T>(endpoint, data, config);
  },

  delete: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(endpoint, config);
  },
};

export default axiosInstance;
