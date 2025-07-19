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
    title: 'About',
    href: ROUTES.ABOUT,
    children: [
      {
        title: 'About TEUAS',
        href: ROUTES.ABOUT,
        description: 'Learn about our organization',
      },
      {
        title: 'Contact Us',
        href: ROUTES.CONTACT,
        description: 'Get in touch with us',
      },
    ],
  },
  {
    title: 'Alumni',
    href: ROUTES.ALUMNI.ROOT,
    children: [
      {
        title: 'Alumni Directory',
        href: ROUTES.ALUMNI.DIRECTORY,
        description: 'Find and connect with fellow alumni',
      },
      {
        title: 'Register as Alumni',
        href: ROUTES.REGISTER,
        description: 'Join our alumni community',
      },
      {
        title: 'Alumni Articles',
        href: ROUTES.ALUMNI.ARTICLES.ROOT,
        description: 'Read articles by alumni',
      },
      {
        title: 'Mentorship',
        href: ROUTES.ALUMNI.MENTORSHIP.ROOT,
        description: 'Find mentors or become one',
      },
    ],
  },
  {
    title: 'News & Events',
    href: ROUTES.NEWS.ROOT,
    children: [
      {
        title: 'Latest News',
        href: ROUTES.NEWS.ROOT,
        description: 'Stay updated with latest news',
      },
      {
        title: 'Upcoming Events',
        href: ROUTES.EVENTS.ROOT,
        description: 'Discover upcoming events',
      },
      {
        title: 'Event Calendar',
        href: ROUTES.EVENTS.CALENDAR,
        description: 'View events in calendar format',
      },
    ],
  },
  {
    title: 'Gallery',
    href: ROUTES.GALLERY.ROOT,
  },
  {
    title: 'Community',
    href: ROUTES.FORUM.ROOT,
    children: [
      {
        title: 'Discussion Forum',
        href: ROUTES.FORUM.DISCUSSIONS,
        description: 'Join community discussions',
      },
      {
        title: 'External Platforms',
        href: ROUTES.FORUM.PLATFORMS,
        description: 'Connect on other platforms',
      },
    ],
  },
  {
    title: 'Opportunities',
    href: ROUTES.SCHOLARSHIPS.ROOT,
    children: [
      {
        title: 'Scholarships',
        href: ROUTES.SCHOLARSHIPS.ROOT,
        description: 'Find scholarship opportunities',
      },
      {
        title: 'Job Board',
        href: ROUTES.JOBS.ROOT,
        description: 'Explore job opportunities',
      },
      {
        title: 'Donate',
        href: ROUTES.SCHOLARSHIPS.DONATE,
        description: 'Support our endowment fund',
      },
    ],
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
      { title: 'About TEUAS', href: ROUTES.ABOUT },
      { title: 'Contact Us', href: ROUTES.CONTACT },
      { title: 'Privacy Policy', href: ROUTES.PRIVACY },
      { title: 'Terms of Service', href: ROUTES.TERMS },
    ],
  },
  community: {
    title: 'Community',
    items: [
      { title: 'Alumni Directory', href: ROUTES.ALUMNI.DIRECTORY },
      { title: 'Discussion Forum', href: ROUTES.FORUM.DISCUSSIONS },
      { title: 'Events', href: ROUTES.EVENTS.ROOT },
      { title: 'News', href: ROUTES.NEWS.ROOT },
    ],
  },
  opportunities: {
    title: 'Opportunities',
    items: [
      { title: 'Scholarships', href: ROUTES.SCHOLARSHIPS.ROOT },
      { title: 'Job Board', href: ROUTES.JOBS.ROOT },
      { title: 'Mentorship', href: ROUTES.ALUMNI.MENTORSHIP.ROOT },
      { title: 'Donate', href: ROUTES.SCHOLARSHIPS.DONATE },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { title: 'Alumni Articles', href: ROUTES.ALUMNI.ARTICLES.ROOT },
      { title: 'Gallery', href: ROUTES.GALLERY.ROOT },
      { title: 'External Platforms', href: ROUTES.FORUM.PLATFORMS },
      { title: 'Sitemap', href: ROUTES.SITEMAP },
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
