// API client configuration with axios

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getSession } from 'next-auth/react';
import { ApiError, ApiResponse } from '@/types/api';
import { logger } from '@teuas/shared/utils';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Extend axios request config to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

// Request interceptor for auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      logger.warn('Failed to get session for API request:', error);
    }

    // Add request timestamp
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time for monitoring
    const endTime = new Date();
    const startTime = response.config.metadata?.startTime;
    if (startTime) {
      const duration = endTime.getTime() - startTime.getTime();
      logger.log(
        `API ${response.config.method?.toUpperCase()} ${response.config.url}: ${duration}ms`
      );
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear session and redirect to login
      if (typeof window !== 'undefined') {
        // In browser environment
        const { signOut } = await import('next-auth/react');
        await signOut({ redirect: false });
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      const networkError: ApiError = {
        message: 'Network error. Please check your internet connection.',
        status: 0,
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }

    // Handle server errors
    const apiError: ApiError = {
      message:
        error.response.data?.message ||
        error.response.data?.error ||
        'An unexpected error occurred',
      status: error.response.status,
      code: error.response.data?.code,
      details: error.response.data?.details,
    };

    // Log error for debugging
    logger.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response.status,
      message: apiError.message,
    });

    return Promise.reject(apiError);
  }
);

// API client wrapper with typed methods
export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = apiClient;
  }

  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // File upload method
  async upload<T = unknown>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<ApiResponse<T>>(
      url,
      formData,
      config
    );
    return response.data;
  }

  // Bulk upload method
  async uploadMultiple<T = unknown>(
    url: string,
    files: File[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    };

    const response = await this.client.post<ApiResponse<T>>(
      url,
      formData,
      config
    );
    return response.data;
  }

  // Get raw axios instance for special cases
  getRawClient(): AxiosInstance {
    return this.client;
  }
}

// Export default instance
export const api = new ApiClient();
export default apiClient;

// Export types for use in other files
export type { ApiError, ApiResponse } from '@/types/api';
