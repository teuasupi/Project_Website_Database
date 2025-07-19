// Main type definitions for IKA TEUAS UPI frontend

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
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

// User types (matching backend)
export interface User {
  id: number;
  email: string;
  fullName: string;
  graduationYear?: number;
  nim?: string;
  major?: string;
  phoneNumber?: string;
  address?: string;
  profilePhoto?: string;
  role: 'admin' | 'user';
  currentCompany?: string;
  position?: string;
}

// Auth types
export interface AuthResponse {
  message: string;
  token?: string;
  user?: Omit<User, 'password'>;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  graduationYear?: number;
  nim?: string;
  major?: string;
  phoneNumber?: string;
}

// Content types
export interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featureImage?: string;
  authorId: number;
  author?: User;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  viewCount?: number;
  likeCount?: number;
  category?: ArticleCategory;
  tags?: string[];
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  featuredImage?: string;
  eventDate: string;
  endDate?: string;
  location: string;
  registrationUrl?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  category?: EventCategory;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface EventCategory {
  id: number;
  name: string;
  slug: string;
  color: string;
  icon?: string;
}

// Media types
export interface MediaItem {
  id: number;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  fileSize: number;
  uploadedBy: number;
  uploader?: User;
  albumId?: number;
  album?: MediaAlbum;
  tags: string[];
  createdAt: string;
  slug: string;
}

export interface MediaAlbum {
  id: number;
  title: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  createdBy: number;
  creator?: User;
  isPublic: boolean;
  createdAt: string;
  slug: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  requireAuth?: boolean;
  adminOnly?: boolean;
  icon?: React.ComponentType;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface FilterState {
  search: string;
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Form types
export interface FormState<T = any> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Search types
export interface SearchResult {
  type: 'alumni' | 'article' | 'event' | 'media';
  id: number;
  title: string;
  excerpt?: string;
  url: string;
  thumbnail?: string;
  date?: string;
}

// Upload types
export interface UploadProgress {
  progress: number;
  fileName: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}
