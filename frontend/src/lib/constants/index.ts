// Application constants and configuration

// App configuration
export const APP_CONFIG = {
  name: 'IKA TEUAS UPI',
  fullName: 'Ikatan Keluarga Alumni Teknik Elektro UPI',
  description: 'Alumni Association of Electrical Engineering UPI',
  shortDescription:
    'Connecting electrical engineering alumni from Universitas Pendidikan Indonesia',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',

  // Contact information
  contact: {
    email: 'info@ikateuas.com',
    phone: '+62 22 2013163',
    address: 'Jl. Dr. Setiabudhi No. 229, Bandung 40154, Indonesia',
  },

  // Social media links
  social: {
    facebook: 'https://facebook.com/ikateuas',
    instagram: 'https://instagram.com/ikateuas_upi',
    twitter: 'https://twitter.com/ikateuas',
    linkedin: 'https://linkedin.com/company/ikateuas',
    youtube: 'https://youtube.com/c/ikateuas',
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
    version: 'v1',
  },

  // Feature flags
  features: {
    registration: true,
    forum: true,
    mentorship: true,
    jobs: true,
    scholarships: true,
    events: true,
    gallery: true,
    articles: true,
  },
} as const;

// Route constants
export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',

  // Authentication routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Alumni routes
  ALUMNI: {
    ROOT: '/alumni',
    DIRECTORY: '/alumni',
    PROFILE: (id: string) => `/alumni/${id}`,
    EDIT_PROFILE: '/alumni/edit',
    NETWORK: '/alumni/network',

    // Alumni articles
    ARTICLES: {
      ROOT: '/alumni/articles',
      CREATE: '/alumni/articles/create',
      EDIT: (id: string) => `/alumni/articles/edit/${id}`,
      VIEW: (slug: string) => `/alumni/articles/${slug}`,
      DASHBOARD: '/alumni/articles/dashboard',
    },

    // Mentorship
    MENTORSHIP: {
      ROOT: '/alumni/mentorship',
      FIND_MENTOR: '/alumni/mentorship/find-mentor',
      DASHBOARD: '/alumni/mentorship/dashboard',
    },
  },

  // Content routes
  NEWS: {
    ROOT: '/news',
    ARTICLE: (slug: string) => `/news/${slug}`,
    CATEGORY: (slug: string) => `/news/category/${slug}`,
  },

  EVENTS: {
    ROOT: '/events',
    DETAIL: (slug: string) => `/events/${slug}`,
    CALENDAR: '/events/calendar',
    REGISTER: (slug: string) => `/events/${slug}/register`,
  },

  GALLERY: {
    ROOT: '/gallery',
    ALBUM: (slug: string) => `/gallery/${slug}`,
    MEDIA: (albumSlug: string, mediaSlug: string) =>
      `/gallery/${albumSlug}/${mediaSlug}`,
  },

  // Community routes
  FORUM: {
    ROOT: '/forum',
    DISCUSSIONS: '/forum/discussions',
    DISCUSSION: (id: string) => `/forum/discussions/${id}`,
    CREATE: '/forum/discussions/create',
    PLATFORMS: '/forum/platforms',
  },

  // Opportunity routes
  SCHOLARSHIPS: {
    ROOT: '/scholarships',
    DETAIL: (slug: string) => `/scholarships/${slug}`,
    APPLY: (slug: string) => `/scholarships/${slug}/apply`,
    DONATE: '/scholarships/donate',
    MY_APPLICATIONS: '/scholarships/my-applications',
    DONORS: '/scholarships/donors',
  },

  JOBS: {
    ROOT: '/jobs',
    DETAIL: (id: string) => `/jobs/${id}`,
    POST: '/jobs/post',
    APPLICATIONS: '/jobs/applications',
  },

  // Admin routes
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',

    USERS: {
      ROOT: '/admin/users',
      PENDING: '/admin/users/pending',
      DETAIL: (id: string) => `/admin/users/${id}`,
    },

    CONTENT: {
      ROOT: '/admin/content',
      NEWS: '/admin/content/news',
      EVENTS: '/admin/content/events',
      MEDIA: '/admin/content/media',
      ARTICLES: '/admin/content/articles',
    },

    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
  },

  // Utility routes
  SEARCH: '/search',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SITEMAP: '/sitemap.xml',
} as const;

// Academic programs and majors
export const MAJORS = [
  'Teknik Elektro',
  'Teknik Elektronika',
  'Teknik Telekomunikasi',
  'Teknik Komputer',
  'Teknik Informatika',
  'Sistem Informasi',
] as const;

// Graduation years (last 30 years)
export const GRADUATION_YEARS = Array.from(
  { length: 35 },
  (_, i) => new Date().getFullYear() - i
);

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
} as const;

// Article categories
export const ARTICLE_CATEGORIES = [
  { id: 'technology', name: 'Technology', color: '#3B82F6' },
  { id: 'career', name: 'Career Development', color: '#10B981' },
  { id: 'research', name: 'Research & Innovation', color: '#8B5CF6' },
  { id: 'industry', name: 'Industry Insights', color: '#F59E0B' },
  { id: 'education', name: 'Education', color: '#EF4444' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', color: '#EC4899' },
  { id: 'lifestyle', name: 'Lifestyle', color: '#6B7280' },
] as const;

// Event categories
export const EVENT_CATEGORIES = [
  { id: 'networking', name: 'Networking', color: '#3B82F6', icon: 'Users' },
  { id: 'workshop', name: 'Workshop', color: '#10B981', icon: 'Tool' },
  { id: 'seminar', name: 'Seminar', color: '#8B5CF6', icon: 'Presentation' },
  {
    id: 'conference',
    name: 'Conference',
    color: '#F59E0B',
    icon: 'Microphone',
  },
  { id: 'social', name: 'Social Event', color: '#EF4444', icon: 'Heart' },
  { id: 'career', name: 'Career Fair', color: '#EC4899', icon: 'Briefcase' },
  { id: 'reunion', name: 'Reunion', color: '#06B6D4', icon: 'Calendar' },
] as const;

// Contact form categories
export const CONTACT_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'alumni-services', label: 'Alumni Services' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'media', label: 'Media Inquiry' },
  { value: 'feedback', label: 'Feedback' },
] as const;

// File upload constraints
export const UPLOAD_LIMITS = {
  IMAGE: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxWidth: 2048,
    maxHeight: 2048,
  },
  DOCUMENT: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  VIDEO: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg'],
  },
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 50, 100],
} as const;

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#1E40AF', // Blue
    SECONDARY: '#059669', // Green
    ACCENT: '#7C3AED', // Purple
    WARNING: '#D97706', // Orange
    DANGER: '#DC2626', // Red
    SUCCESS: '#059669', // Green
  },
  FONTS: {
    SANS: ['Inter', 'system-ui', 'sans-serif'],
    MONO: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
} as const;

// Animation durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ika_teuas_auth_token',
  USER_PREFERENCES: 'ika_teuas_user_preferences',
  THEME: 'ika_teuas_theme',
  LANGUAGE: 'ika_teuas_language',
  SEARCH_HISTORY: 'ika_teuas_search_history',
  DRAFT_ARTICLES: 'ika_teuas_draft_articles',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden. Please contact administrator.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  SERVER: 'Server error. Please try again later.',
  UNKNOWN: 'An unexpected error occurred.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVE: 'Changes saved successfully',
  CREATE: 'Created successfully',
  UPDATE: 'Updated successfully',
  DELETE: 'Deleted successfully',
  SEND: 'Sent successfully',
  UPLOAD: 'Uploaded successfully',
  LOGIN: 'Logged in successfully',
  LOGOUT: 'Logged out successfully',
  REGISTER: 'Registration completed successfully',
} as const;
