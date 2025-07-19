// API-specific types and interfaces

import { User, Article, Event, MediaItem } from './index';

// Re-export from main types for convenience
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// API Client types
export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Request/Response types
export interface ApiRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

export interface ApiResponseMeta {
  timestamp: string;
  requestId: string;
  version: string;
}

// Pagination types
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedApiResponse<T> {
  data: T[];
  meta: PaginationMeta;
  success: boolean;
  message?: string;
}

// Filter types
export interface BaseFilter {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface UserFilter extends BaseFilter {
  role?: string;
  graduationYear?: number;
  major?: string;
  isActive?: boolean;
}

export interface ArticleFilter extends BaseFilter {
  category?: string;
  authorId?: number;
  status?: string;
  publishedAfter?: string;
  publishedBefore?: string;
}

export interface EventFilter extends BaseFilter {
  category?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: string;
}

export interface MediaFilter extends BaseFilter {
  type?: 'image' | 'video';
  albumId?: number;
  uploadedBy?: number;
  tags?: string[];
}

// API endpoint response types
export interface UsersApiResponse extends PaginatedApiResponse<User> {}
export interface ArticlesApiResponse extends PaginatedApiResponse<Article> {}
export interface EventsApiResponse extends PaginatedApiResponse<Event> {}
export interface MediaApiResponse extends PaginatedApiResponse<MediaItem> {}

// File upload types
export interface FileUploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface BulkUploadResponse {
  uploaded: FileUploadResponse[];
  failed: {
    fileName: string;
    error: string;
  }[];
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

// Analytics types
export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: {
    path: string;
    views: number;
  }[];
  userActivity: {
    date: string;
    activeUsers: number;
  }[];
}

// Search types
export interface SearchApiResponse {
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
  suggestions?: string[];
}

export interface SearchResult {
  type: 'user' | 'article' | 'event' | 'media';
  id: number;
  title: string;
  excerpt?: string;
  url: string;
  relevanceScore: number;
  highlightedFields?: Record<string, string>;
}

// Notification types
export interface NotificationApiResponse {
  notifications: NotificationItem[];
  unreadCount: number;
  hasMore: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'mention' | 'like' | 'comment' | 'follow' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}
