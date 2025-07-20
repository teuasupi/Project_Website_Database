// API endpoint constants

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_EMAIL: '/api/auth/verify-email',
    CHANGE_PASSWORD: '/api/auth/change-password',
  },

  // Users
  USERS: {
    BASE: '/api/users',
    PROFILE: (id: number) => `/api/users/${id}`,
    UPDATE: (id: number) => `/api/users/${id}`,
    DELETE: (id: number) => `/api/users/${id}`,
    UPLOAD_PHOTO: (id: number) => `/api/users/${id}/upload-photo`,
    SEARCH: '/api/users/search',
  },

  // Articles
  ARTICLES: {
    BASE: '/api/articles',
    DETAIL: (slug: string) => `/api/articles/${slug}`,
    CREATE: '/api/articles',
    UPDATE: (id: number) => `/api/articles/${id}`,
    DELETE: (id: number) => `/api/articles/${id}`,
    LIKE: (id: number) => `/api/articles/${id}/like`,
    COMMENTS: (id: number) => `/api/articles/${id}/comments`,
    CATEGORIES: '/api/articles/categories',
  },

  // Events
  EVENTS: {
    BASE: '/api/events',
    DETAIL: (slug: string) => `/api/events/${slug}`,
    CREATE: '/api/events',
    UPDATE: (id: number) => `/api/events/${id}`,
    DELETE: (id: number) => `/api/events/${id}`,
    REGISTER: (id: number) => `/api/events/${id}/register`,
    ATTENDEES: (id: number) => `/api/events/${id}/attendees`,
    CATEGORIES: '/api/events/categories',
  },

  // News
  NEWS: {
    BASE: '/api/news',
    DETAIL: (slug: string) => `/api/news/${slug}`,
    CREATE: '/api/news',
    UPDATE: (id: number) => `/api/news/${id}`,
    DELETE: (id: number) => `/api/news/${id}`,
    CATEGORIES: '/api/news/categories',
    TRENDING: '/api/news/trending',
  },

  // Media
  MEDIA: {
    BASE: '/api/media',
    DETAIL: (slug: string) => `/api/media/${slug}`,
    UPLOAD: '/api/media/upload',
    BULK_UPLOAD: '/api/media/bulk-upload',
    DELETE: (id: number) => `/api/media/${id}`,
    ALBUMS: '/api/media/albums',
    ALBUM_DETAIL: (slug: string) => `/api/media/albums/${slug}`,
    DOWNLOAD: (id: number) => `/api/media/${id}/download`,
  },

  // Alumni
  ALUMNI: {
    BASE: '/api/alumni',
    PROFILE: (id: number) => `/api/alumni/${id}`,
    DIRECTORY: '/api/alumni/directory',
    SEARCH: '/api/alumni/search',
    CONNECT: '/api/alumni/connect',
    CONNECTIONS: '/api/alumni/connections',
    FEATURED: '/api/alumni/featured',
  },

  // Registration
  REGISTRATION: {
    SUBMIT: '/api/registration/submit',
    VERIFY: '/api/registration/verify',
    CHECK_EMAIL: '/api/registration/check-email',
    VERIFY_NIM: '/api/registration/verify-nim',
    UPLOAD_DOCUMENT: '/api/registration/upload-document',
    STATUS: (id: string) => `/api/registration/${id}/status`,
  },

  // Forum
  FORUM: {
    DISCUSSIONS: '/api/forum/discussions',
    DISCUSSION_DETAIL: (id: number) => `/api/forum/discussions/${id}`,
    CREATE_DISCUSSION: '/api/forum/discussions',
    REPLY: (id: number) => `/api/forum/discussions/${id}/replies`,
    PLATFORMS: '/api/forum/platforms',
    CATEGORIES: '/api/forum/categories',
  },

  // Scholarships
  SCHOLARSHIPS: {
    BASE: '/api/scholarships',
    DETAIL: (slug: string) => `/api/scholarships/${slug}`,
    APPLY: (id: number) => `/api/scholarships/${id}/apply`,
    APPLICATIONS: '/api/scholarships/applications',
    DONATE: '/api/scholarships/donate',
    FUNDS: '/api/scholarships/funds',
  },

  // Jobs
  JOBS: {
    BASE: '/api/jobs',
    DETAIL: (id: number) => `/api/jobs/${id}`,
    CREATE: '/api/jobs',
    APPLY: (id: number) => `/api/jobs/${id}/apply`,
    APPLICATIONS: '/api/jobs/applications',
    CATEGORIES: '/api/jobs/categories',
  },

  // Mentorship
  MENTORSHIP: {
    MENTORS: '/api/mentorship/mentors',
    REQUEST: '/api/mentorship/request',
    SESSIONS: '/api/mentorship/sessions',
    MY_MENTORSHIPS: '/api/mentorship/my-mentorships',
  },

  // Search
  SEARCH: {
    GLOBAL: '/api/search',
    SUGGESTIONS: '/api/search/suggestions',
    AUTOCOMPLETE: '/api/search/autocomplete',
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/api/notifications',
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/mark-all-read',
    SETTINGS: '/api/notifications/settings',
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: '/api/analytics/dashboard',
    PAGE_VIEWS: '/api/analytics/page-views',
    USER_ACTIVITY: '/api/analytics/user-activity',
    CONTENT_PERFORMANCE: '/api/analytics/content-performance',
  },

  // Admin
  ADMIN: {
    USERS: '/api/admin/users',
    PENDING_REGISTRATIONS: '/api/admin/registrations/pending',
    APPROVE_REGISTRATION: (id: string) =>
      `/api/admin/registrations/${id}/approve`,
    REJECT_REGISTRATION: (id: string) =>
      `/api/admin/registrations/${id}/reject`,
    CONTENT: '/api/admin/content',
    ANALYTICS: '/api/admin/analytics',
    SETTINGS: '/api/admin/settings',
  },

  // Contact
  CONTACT: {
    SUBMIT: '/api/contact/submit',
    SUBSCRIBE: '/api/contact/subscribe',
  },
} as const;

// Helper function to build query string
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Helper function to build URL with query params
export const buildUrl = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  if (!params) return endpoint;
  return `${endpoint}${buildQueryString(params)}`;
};
