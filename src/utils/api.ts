// // src/utils/api.ts
// import axios, {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   AxiosError,
//   InternalAxiosRequestConfig
// } from 'axios';

// // Load API URL from .env with type safety
// const API_URL: string = import.meta.env.VITE_PUBLIC_API_URL || 'http://localhost:3000';

// // Define custom error type for API responses
// interface ApiError {
//   status: number;
//   message: string;
//   data?: any;
//   url?: string;
// }

// // Create Axios instance with baseURL
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Enable cookies if needed
// });

// /**
//  * Request interceptor to add Authorization header
//  * Handles token injection and request logging
//  */
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Safely access localStorage only in browser environment
//     const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`
//       };
//     }

//     // Log request details in development
//     if (import.meta.env.DEV) {
//       console.debug('API Request:', {
//         method: config.method?.toUpperCase(),
//         url: config.url,
//         headers: config.headers,
//         params: config.params,
//         data: config.data
//       });
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     // Enhanced request error handling
//     const apiError: ApiError = {
//       status: error.response?.status || 0,
//       message: error.message,
//       url: error.config?.url
//     };
    
//     console.error('API Request Error:', apiError);
//     return Promise.reject(apiError);
//   }
// );

// /**
//  * Response interceptor to handle API errors globally
//  * Provides consistent error formatting and logging
//  */
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Log successful responses in development
//     if (import.meta.env.DEV) {
//       console.debug('API Response:', {
//         status: response.status,
//         url: response.config.url,
//         data: response.data
//       });
//     }
//     return response;
//   },
//   (error: AxiosError) => {
//     // Format consistent error response
//     const apiError: ApiError = {
//       status: error.response?.status || 0,
//       message: error.message,
//       data: error.response?.data,
//       url: error.config?.url
//     };

//     // Handle specific status codes
//     switch (error.response?.status) {
//       case 401:
//         console.error('Authentication Error:', apiError);
//         // Redirect to login if in browser environment
//         if (typeof window !== 'undefined') {
//           window.location.href = '/login';
//         }
//         break;
//       case 403:
//         console.error('Authorization Error:', apiError);
//         break;
//       case 404:
//         console.error('Resource Not Found:', apiError);
//         break;
//       case 500:
//         console.error('Server Error:', apiError);
//         break;
//       default:
//         console.error('API Error:', apiError);
//     }

//     return Promise.reject(apiError);
//   }
// );

// /**
//  * Enhanced HTTP Client wrapper with:
//  * - Type safety
//  * - Consistent error handling
//  * - Debug logging
//  */
// export const HttpClient = {
//   get: async <T = any>(
//     endpoint: string,
//     params?: Record<string, any>,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       return await axiosInstance.get<T>(endpoint, { params, ...config });
//     } catch (error) {
//       throw handleApiError(error as ApiError);
//     }
//   },

//   post: async <T = any>(
//     endpoint: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       return await axiosInstance.post<T>(endpoint, data, config);
//     } catch (error) {
//       throw handleApiError(error as ApiError);
//     }
//   },

//   put: async <T = any>(
//     endpoint: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       return await axiosInstance.put<T>(endpoint, data, config);
//     } catch (error) {
//       throw handleApiError(error as ApiError);
//     }
//   },

//   patch: async <T = any>(
//     endpoint: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       return await axiosInstance.patch<T>(endpoint, data, config);
//     } catch (error) {
//       throw handleApiError(error as ApiError);
//     }
//   },

//   delete: async <T = any>(
//     endpoint: string,
//     config?: AxiosRequestConfig
//   ): Promise<AxiosResponse<T>> => {
//     try {
//       return await axiosInstance.delete<T>(endpoint, config);
//     } catch (error) {
//       throw handleApiError(error as ApiError);
//     }
//   },
// };

// /**
//  * Handles API errors consistently across the application
//  */
// function handleApiError(error: ApiError): ApiError {
//   // Add any application-specific error handling here
//   // For example: show notification, log to monitoring service, etc.
  
//   // Return enriched error object
//   return {
//     ...error,
//     message: error.data?.message || error.message || 'An unknown error occurred'
//   };
// }

// export default axiosInstance;