// Common validation schemas

import { z } from 'zod';

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
  category: z
    .enum(['general', 'alumni-services', 'technical', 'partnerships'])
    .refine((val) => val !== undefined, 'Please select a category'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Search form validation
export const searchSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query is required')
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must not exceed 100 characters'),
  type: z.enum(['all', 'alumni', 'articles', 'events', 'media']).optional(),
  filters: z.record(z.string(), z.any()).optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().min(1, 'Page must be at least 1').optional().default(1),
  limit: z
    .number()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must not exceed 100')
    .optional()
    .default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

// File upload validation
export const fileUploadSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, 'File is required')
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      'File size must not exceed 10MB'
    ),
  type: z.enum(['image', 'document', 'video']).optional(),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;

// Image upload validation
export const imageUploadSchema = z.object({
  file: z
    .any()
    .refine((file) => file instanceof File, 'Image file is required')
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      'Image size must not exceed 5MB'
    )
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
          file.type
        ),
      'File must be a valid image (JPEG, PNG, WebP, or GIF)'
    ),
});

export type ImageUploadData = z.infer<typeof imageUploadSchema>;

// Profile update validation
export const profileUpdateSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  phoneNumber: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
      'Please enter a valid Indonesian phone number'
    )
    .optional()
    .or(z.literal('')),
  address: z
    .string()
    .max(500, 'Address must not exceed 500 characters')
    .optional(),
  currentCompany: z
    .string()
    .max(100, 'Company name must not exceed 100 characters')
    .optional(),
  position: z
    .string()
    .max(100, 'Position must not exceed 100 characters')
    .optional(),
  bio: z.string().max(1000, 'Bio must not exceed 1000 characters').optional(),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  linkedinUrl: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional()
    .or(z.literal('')),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

// Newsletter subscription validation
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  preferences: z
    .array(z.enum(['news', 'events', 'jobs', 'articles']))
    .optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// Comment validation
export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment is required')
    .min(3, 'Comment must be at least 3 characters')
    .max(1000, 'Comment must not exceed 1000 characters'),
  parentId: z.number().optional(),
});

export type CommentFormData = z.infer<typeof commentSchema>;

// Rating validation
export const ratingSchema = z.object({
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5'),
  review: z
    .string()
    .max(500, 'Review must not exceed 500 characters')
    .optional(),
});

export type RatingFormData = z.infer<typeof ratingSchema>;
