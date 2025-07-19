'use client';

// Custom hooks for API operations

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { toast } from 'sonner';

// Generic API hook for GET requests
export function useApi<T>(
  url: string,
  options?: {
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    params?: Record<string, any>;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (options?.enabled === false) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<T>(url, { params: options?.params });
      setData(response.data || null);
      options?.onSuccess?.(response.data as T);
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      options?.onError?.(err);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [
    url,
    options?.enabled,
    options?.params,
    options?.onSuccess,
    options?.onError,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}

// Hook for paginated API requests
export function usePaginatedApi<T>(
  url: string,
  options?: {
    enabled?: boolean;
    initialPage?: number;
    pageSize?: number;
    params?: Record<string, any>;
    onSuccess?: (data: PaginatedResponse<T>) => void;
    onError?: (error: any) => void;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: options?.initialPage || 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: options?.pageSize || 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = useCallback(
    async (page: number, append = false) => {
      if (options?.enabled === false) return;

      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page,
          limit: pagination.itemsPerPage,
          ...options?.params,
        };

        const response = await api.get<PaginatedResponse<T>>(url, { params });
        const responseData = response.data;

        if (responseData) {
          setData((prev) =>
            append ? [...prev, ...responseData.data] : responseData.data
          );
          setPagination(responseData.pagination);
          setHasMore(
            responseData.pagination.currentPage <
              responseData.pagination.totalPages
          );
          options?.onSuccess?.(responseData);
        }
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);
        options?.onError?.(err);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [
      url,
      pagination.itemsPerPage,
      options?.enabled,
      options?.params,
      options?.onSuccess,
      options?.onError,
    ]
  );

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchData(pagination.currentPage + 1, true);
    }
  }, [fetchData, hasMore, isLoading, pagination.currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      fetchData(page, false);
    },
    [fetchData]
  );

  const refresh = useCallback(() => {
    fetchData(1, false);
  }, [fetchData]);

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, []);

  return {
    data,
    pagination,
    isLoading,
    error,
    hasMore,
    loadMore,
    goToPage,
    refresh,
  };
}

// Hook for API mutations (POST, PUT, DELETE)
export function useMutation<TData, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: any, variables: TVariables) => void;
    onSettled?: (
      data: TData | undefined,
      error: any,
      variables: TVariables
    ) => void;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mutationFn(variables);
        const data = response.data as TData;

        options?.onSuccess?.(data, variables);

        if (options?.showSuccessToast !== false) {
          toast.success(
            options?.successMessage || 'Operation completed successfully'
          );
        }

        options?.onSettled?.(data, null, variables);
        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);

        options?.onError?.(err, variables);

        if (options?.showErrorToast !== false) {
          toast.error(errorMessage);
        }

        options?.onSettled?.(undefined, err, variables);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  return {
    mutate,
    isLoading,
    error,
  };
}

// Hook for optimistic updates
export function useOptimisticMutation<TData, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options: {
    onMutate?: (variables: TVariables) => any;
    onSuccess?: (data: TData, variables: TVariables, context: any) => void;
    onError?: (error: any, variables: TVariables, context: any) => void;
    onSettled?: (
      data: TData | undefined,
      error: any,
      variables: TVariables,
      context: any
    ) => void;
  }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      // Call onMutate for optimistic updates
      const context = options.onMutate?.(variables);

      try {
        const response = await mutationFn(variables);
        const data = response.data as TData;

        options.onSuccess?.(data, variables, context);
        options.onSettled?.(data, null, variables, context);

        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);

        options.onError?.(err, variables, context);
        options.onSettled?.(undefined, err, variables, context);

        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  return {
    mutate,
    isLoading,
    error,
  };
}

// Hook for file uploads
export function useFileUpload(
  uploadFn: (file: File) => Promise<ApiResponse<any>>,
  options?: {
    onSuccess?: (data: any, file: File) => void;
    onError?: (error: any, file: File) => void;
    onProgress?: (progress: number) => void;
  }
) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      try {
        const response = await uploadFn(file);
        const data = response.data;

        setProgress(100);
        options?.onSuccess?.(data, file);
        toast.success('File uploaded successfully');

        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'Upload failed';
        setError(errorMessage);
        options?.onError?.(err, file);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFn, options]
  );

  return {
    upload,
    isUploading,
    progress,
    error,
  };
}
