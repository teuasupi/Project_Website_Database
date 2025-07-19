# Phase 2 Detailed Plan: Core Pages & Layout

**Date:** July 19, 2025
**Author:** Claude
**Phase:** 2 of 6
**Estimated Time:** 3-4 days
**Dependencies:** Phase 1 (Setup & Infrastructure) must be completed

## Overview
This phase implements the foundational pages and layout components for the IKA TEUAS UPI website. We'll create the main navigation, homepage, about page, and contact page as defined in PRD features FEAT-01, FEAT-02, and FEAT-05.

## 1. Global Layout System

### 1.1 Main Layout Component (src/components/layout/RootLayout.tsx)
```typescript
interface RootLayoutProps {
  children: React.ReactNode;
}

// Features:
- Responsive header with navigation
- Main content area
- Footer component
- Mobile-friendly navigation drawer
- Toast notification container
- Loading states and error boundaries
```

### 1.2 Header Component (src/components/layout/Header.tsx)
```typescript
// Features:
- IKA TEUAS UPI logo and branding
- Main navigation menu (desktop)
- Mobile hamburger menu
- User authentication status
- Login/logout functionality
- Profile dropdown for authenticated users
- Search functionality (future enhancement)

// Navigation items:
- Home
- About TEUAS
- Alumni (dropdown: Directory, Register, Articles)
- News & Events
- Gallery
- Scholarships
- Contact
```

### 1.3 Navigation Component (src/components/layout/Navigation.tsx)
```typescript
interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
  requireAuth?: boolean;
  adminOnly?: boolean;
}

// Features:
- Multi-level dropdown menus
- Active state indication
- Mobile responsive collapsible menu
- Role-based menu visibility
- Accessibility features (ARIA labels)
```

### 1.4 Footer Component (src/components/layout/Footer.tsx)
```typescript
// Sections:
- Organization info (address, phone, email)
- Quick links (About, Contact, Privacy Policy)
- Social media links
- Alumni resources
- Copyright and legal information
- University partnership acknowledgment
```

### 1.5 Mobile Navigation (src/components/layout/MobileNav.tsx)
```typescript
// Features:
- Slide-in navigation drawer
- Touch-friendly menu items
- User profile section when authenticated
- Search integration
- Close on route change
```

## 2. Homepage Implementation (FEAT-01)

### 2.1 Homepage Structure (src/app/page.tsx)
```typescript
// Sections:
1. Hero Section
2. Welcome Message
3. Quick Stats
4. Latest News/Announcements
5. Featured Alumni
6. Upcoming Events
7. Call-to-Action sections
```

### 2.2 Hero Section (src/components/common/HeroSection.tsx)
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaButton?: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
}

// Features:
- Full-width hero banner
- Overlay text with university branding
- Call-to-action buttons
- Responsive background images
- Animation effects (Framer Motion)
```

### 2.3 Stats Section (src/components/common/StatsSection.tsx)
```typescript
interface StatItem {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType;
}

// Stats to display:
- Total registered alumni
- Graduation years covered
- Countries represented
- Active job postings
- Recent articles published
```

### 2.4 Latest News Widget (src/components/features/news/LatestNews.tsx)
```typescript
// Features:
- Display 3-4 latest news/announcements
- Thumbnail images
- Publication dates
- Read more links
- "View All News" button
- Loading and error states
```

### 2.5 Featured Alumni (src/components/features/alumni/FeaturedAlumni.tsx)
```typescript
// Features:
- Alumni spotlight carousel
- Professional achievements
- Current positions and companies
- Profile photos
- "Learn More" links to full profiles
```

### 2.6 Upcoming Events (src/components/features/events/UpcomingEvents.tsx)
```typescript
// Features:
- Next 3-4 upcoming events
- Event dates and times
- Location information
- Registration links
- Event categories/tags
```

## 3. About TEUAS Page (FEAT-02)

### 3.1 About Page Structure (src/app/about/page.tsx)
```typescript
// Sections:
1. Page header with breadcrumbs
2. Organization overview
3. Vision and mission statements
4. History and milestones
5. Leadership team
6. Teknik Elektro UPI program overview
7. Partnership information
```

### 3.2 Mission/Vision Component (src/components/features/about/MissionVision.tsx)
```typescript
interface MissionVisionProps {
  mission: string;
  vision: string;
  values?: string[];
}

// Features:
- Side-by-side layout (desktop)
- Stacked layout (mobile)
- Icon representations
- Professional styling
```

### 3.3 Leadership Team (src/components/features/about/LeadershipTeam.tsx)
```typescript
interface LeadershipMember {
  name: string;
  position: string;
  bio: string;
  photo?: string;
  email?: string;
  linkedin?: string;
}

// Features:
- Grid layout of leadership members
- Modal or expand for detailed bios
- Contact information
- Professional photos
```

### 3.4 History Timeline (src/components/features/about/HistoryTimeline.tsx)
```typescript
interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
}

// Features:
- Vertical timeline layout
- Key milestones and achievements
- Interactive timeline navigation
- Responsive design
```

### 3.5 Program Overview (src/components/features/about/ProgramOverview.tsx)
```typescript
// Content:
- Teknik Elektro UPI department information
- Academic programs offered
- Research areas
- Faculty highlights
- Student achievements
- Facilities and resources
```

## 4. Contact & Services Page (FEAT-05)

### 4.1 Contact Page Structure (src/app/contact/page.tsx)
```typescript
// Sections:
1. Page header
2. Contact information cards
3. Contact form
4. Alumni services overview
5. Office locations and map
6. FAQ section
```

### 4.2 Contact Information (src/components/features/contact/ContactInfo.tsx)
```typescript
interface ContactMethod {
  type: 'email' | 'phone' | 'address' | 'social';
  label: string;
  value: string;
  icon: React.ComponentType;
  href?: string;
}

// Features:
- Multiple contact methods
- Clickable phone numbers and emails
- Social media links
- Office hours information
```

### 4.3 Contact Form (src/components/features/contact/ContactForm.tsx)
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'alumni-services' | 'technical' | 'partnerships';
}

// Features:
- Form validation with Zod
- Category selection
- File attachment support
- Success/error feedback
- Spam protection
```

### 4.4 Alumni Services (src/components/features/contact/AlumniServices.tsx)
```typescript
interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType;
  contactPerson?: string;
  email?: string;
}

// Services:
- Career guidance and counseling
- Networking opportunities
- Mentorship programs
- Professional development
- Further education support
- Job placement assistance
```

### 4.5 Office Location (src/components/features/contact/OfficeLocation.tsx)
```typescript
// Features:
- Embedded map (Google Maps or alternative)
- Address and directions
- Public transportation info
- Parking information
- Accessibility details
```

## 5. Shared Components

### 5.1 Page Header (src/components/common/PageHeader.tsx)
```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  actions?: React.ReactNode;
}

// Features:
- Consistent page headers across all pages
- Breadcrumb navigation
- Optional background images
- Action buttons area
```

### 5.2 Breadcrumbs (src/components/common/Breadcrumbs.tsx)
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// Features:
- Auto-generated from route structure
- Manual override capability
- Schema.org structured data
- Accessibility compliance
```

### 5.3 Loading States (src/components/common/LoadingStates.tsx)
```typescript
// Components:
- PageSkeleton
- CardSkeleton
- ListSkeleton
- ImageSkeleton
- TextSkeleton
```

### 5.4 Error Boundaries (src/components/common/ErrorBoundary.tsx)
```typescript
// Features:
- Graceful error handling
- Error reporting
- Fallback UI components
- Retry mechanisms
```

## 6. Responsive Design Implementation

### 6.1 Breakpoint Strategy
```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Laptops */
2xl: 1536px /* Large screens */
```

### 6.2 Mobile-First Components
- All components designed mobile-first
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized loading for mobile networks

### 6.3 Typography Scale
```css
/* Custom typography scale for TEUAS branding */
- Heading fonts: Professional sans-serif
- Body fonts: Readable sans-serif
- Monospace: Code snippets
- Font weights: 400, 500, 600, 700
```

## 7. Accessibility Implementation

### 7.1 WCAG 2.1 Compliance
- AA level compliance target
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Focus management

### 7.2 Semantic HTML
- Proper heading hierarchy
- ARIA labels and descriptions
- Landmark regions
- Form labels and descriptions

## 8. Performance Optimization

### 8.1 Image Optimization
- Next.js Image component usage
- WebP format with fallbacks
- Lazy loading implementation
- Responsive image sizes

### 8.2 Code Splitting
- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

## 9. Testing Strategy

### 9.1 Component Testing
- Unit tests for utility functions
- Component rendering tests
- User interaction testing
- Accessibility testing

### 9.2 Integration Testing
- Navigation flow testing
- Form submission testing
- API integration testing

## File Structure for Phase 2

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── about/
│   │   └── page.tsx               # About page
│   └── contact/
│       └── page.tsx               # Contact page
├── components/
│   ├── layout/
│   │   ├── RootLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   ├── common/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── LoadingStates.tsx
│   │   └── ErrorBoundary.tsx
│   └── features/
│       ├── about/
│       │   ├── MissionVision.tsx
│       │   ├── LeadershipTeam.tsx
│       │   ├── HistoryTimeline.tsx
│       │   └── ProgramOverview.tsx
│       ├── contact/
│       │   ├── ContactInfo.tsx
│       │   ├── ContactForm.tsx
│       │   ├── AlumniServices.tsx
│       │   └── OfficeLocation.tsx
│       ├── news/
│       │   └── LatestNews.tsx
│       ├── alumni/
│       │   └── FeaturedAlumni.tsx
│       └── events/
│           └── UpcomingEvents.tsx
└── lib/
    ├── constants/
    │   ├── navigation.ts
    │   ├── contact.ts
    │   └── about.ts
    └── validations/
        └── contact.ts
```

## Deliverables Checklist

### Layout Components
- [ ] Root layout with header and footer
- [ ] Responsive navigation system
- [ ] Mobile navigation drawer
- [ ] Breadcrumb navigation
- [ ] Loading states and error boundaries

### Homepage (FEAT-01)
- [ ] Hero section with branding
- [ ] Statistics dashboard
- [ ] Latest news widget
- [ ] Featured alumni section
- [ ] Upcoming events preview
- [ ] Call-to-action sections

### About Page (FEAT-02)
- [ ] Organization overview
- [ ] Mission and vision statements
- [ ] Leadership team profiles
- [ ] History timeline
- [ ] Program information

### Contact Page (FEAT-05)
- [ ] Contact information display
- [ ] Contact form with validation
- [ ] Alumni services overview
- [ ] Office location with map
- [ ] FAQ section

### Technical Implementation
- [ ] Responsive design (mobile-first)
- [ ] Accessibility compliance
- [ ] Performance optimization
- [ ] TypeScript type safety
- [ ] Error handling and loading states

## Success Criteria
- All pages load without errors
- Responsive design works across all devices
- Navigation functions correctly
- Forms validate and submit properly
- Accessibility standards met
- Performance scores above 90 (Lighthouse)
- TypeScript compilation without errors
- Component tests pass

## Risk Mitigation
- **Design inconsistencies**: Create design system early
- **Mobile layout issues**: Test on real devices
- **Performance problems**: Implement lazy loading and optimization
- **Accessibility failures**: Use automated testing tools
- **Content management**: Plan for easy content updates