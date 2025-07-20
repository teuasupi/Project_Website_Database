// Navigation configuration

import { NavItem } from '@/types';
import { ROUTES } from './index';

// Main navigation items
export const MAIN_NAVIGATION: NavItem[] = [
  {
    title: 'Home',
    href: ROUTES.HOME,
  },
  {
    title: 'Database Alumni',
    href: ROUTES.ALUMNI.DIRECTORY,
  },
  {
    title: 'Scholarship & Donation',
    href: ROUTES.SCHOLARSHIPS.ROOT,
    children: [
      {
        title: 'Scholarships',
        href: ROUTES.SCHOLARSHIPS.ROOT,
        description: 'Find scholarship opportunities',
      },
      {
        title: 'Donate',
        href: ROUTES.SCHOLARSHIPS.DONATE,
        description: 'Support our endowment fund',
      },
    ],
  },
  {
    title: 'News',
    href: ROUTES.NEWS.ROOT,
  },
  {
    title: 'FGD',
    href: ROUTES.FGD.ROOT,
  },
  {
    title: 'Gallery',
    href: ROUTES.GALLERY.ROOT,
  },
];

// Authenticated user navigation items
export const USER_NAVIGATION: NavItem[] = [
  {
    title: 'My Profile',
    href: ROUTES.ALUMNI.EDIT_PROFILE,
  },
  {
    title: 'My Articles',
    href: ROUTES.ALUMNI.ARTICLES.DASHBOARD,
  },
  {
    title: 'My Network',
    href: ROUTES.ALUMNI.NETWORK,
  },
  {
    title: 'Mentorship',
    href: ROUTES.ALUMNI.MENTORSHIP.DASHBOARD,
  },
  {
    title: 'My Applications',
    href: ROUTES.SCHOLARSHIPS.MY_APPLICATIONS,
  },
];

// Admin navigation items
export const ADMIN_NAVIGATION: NavItem[] = [
  {
    title: 'Dashboard',
    href: ROUTES.ADMIN.DASHBOARD,
  },
  {
    title: 'User Management',
    href: ROUTES.ADMIN.USERS.ROOT,
    children: [
      {
        title: 'All Users',
        href: ROUTES.ADMIN.USERS.ROOT,
        description: 'Manage all registered users',
      },
      {
        title: 'Pending Registrations',
        href: ROUTES.ADMIN.USERS.PENDING,
        description: 'Review pending registrations',
      },
    ],
  },
  {
    title: 'Content Management',
    href: ROUTES.ADMIN.CONTENT.ROOT,
    children: [
      {
        title: 'News Articles',
        href: ROUTES.ADMIN.CONTENT.NEWS,
        description: 'Manage news content',
      },
      {
        title: 'Events',
        href: ROUTES.ADMIN.CONTENT.EVENTS,
        description: 'Manage events',
      },
      {
        title: 'Media Gallery',
        href: ROUTES.ADMIN.CONTENT.MEDIA,
        description: 'Manage media files',
      },
      {
        title: 'Alumni Articles',
        href: ROUTES.ADMIN.CONTENT.ARTICLES,
        description: 'Moderate alumni articles',
      },
    ],
  },
  {
    title: 'Analytics',
    href: ROUTES.ADMIN.ANALYTICS,
  },
  {
    title: 'Settings',
    href: ROUTES.ADMIN.SETTINGS,
  },
];

// Footer navigation items
export const FOOTER_NAVIGATION = {
  about: {
    title: 'About',
    items: [
      { title: 'Home', href: ROUTES.HOME },
      { title: 'About TEUAS', href: ROUTES.ABOUT },
      { title: 'Gallery', href: ROUTES.GALLERY.ROOT },
    ],
  },
  community: {
    title: 'Community',
    items: [
      { title: 'News', href: ROUTES.NEWS.ROOT },
      { title: 'Articles', href: ROUTES.ALUMNI.ARTICLES.ROOT },
      { title: 'Events', href: ROUTES.EVENTS.ROOT },
      { title: 'FGD', href: ROUTES.FORUM.DISCUSSIONS },
    ],
  },
  opportunities: {
    title: 'Opportunities',
    items: [
      { title: 'Scholarship', href: ROUTES.SCHOLARSHIPS.ROOT },
      { title: 'Job Board', href: ROUTES.JOBS.ROOT },
      { title: 'Donate', href: ROUTES.SCHOLARSHIPS.DONATE },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { title: 'Alumni Directory', href: ROUTES.ALUMNI.DIRECTORY },
      { title: 'Discussion Forum', href: ROUTES.FORUM.DISCUSSIONS },
      { title: 'External Platforms', href: ROUTES.FORUM.PLATFORMS },
      { title: 'Mentorship', href: ROUTES.ALUMNI.MENTORSHIP.ROOT },
    ],
  },
} as const;

// Breadcrumb configurations
export const BREADCRUMB_CONFIG = {
  [ROUTES.ALUMNI.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
  ],
  [ROUTES.ALUMNI.ARTICLES.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Alumni', href: ROUTES.ALUMNI.ROOT },
    { label: 'Articles', href: ROUTES.ALUMNI.ARTICLES.ROOT },
  ],
  [ROUTES.NEWS.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'News', href: ROUTES.NEWS.ROOT },
  ],
  [ROUTES.EVENTS.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Events', href: ROUTES.EVENTS.ROOT },
  ],
  [ROUTES.GALLERY.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Gallery', href: ROUTES.GALLERY.ROOT },
  ],
  [ROUTES.FORUM.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Forum', href: ROUTES.FORUM.ROOT },
  ],
  [ROUTES.SCHOLARSHIPS.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Scholarships', href: ROUTES.SCHOLARSHIPS.ROOT },
  ],
  [ROUTES.JOBS.ROOT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Jobs', href: ROUTES.JOBS.ROOT },
  ],
} as const;
