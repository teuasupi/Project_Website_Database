# Phase 3 Detailed Plan: Content Management

**Date:** July 19, 2025
**Author:** Ramdan
**Phase:** 3 of 6
**Estimated Time:** 4-5 days
**Dependencies:** Phase 1 (Infrastructure) and Phase 2 (Core Layout) must be completed
**Status:** In Progress 🔄

## Overview

This phase implements content management features for news, events, and media gallery as defined in PRD features FEAT-03 (News and Events) and FEAT-04 (Media Gallery). We'll create both public viewing interfaces and admin management capabilities.

## 1. News and Events System (FEAT-03)

### 1.1 News Architecture

#### 1.1.1 News Data Types (src/types/content.ts)

```typescript
export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  authorId: number;
  author?: User;
  category: NewsCategory;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  slug: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface NewsFilter {
  category?: string;
  tag?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  search?: string;
}
```

#### 1.1.2 News API Integration (src/lib/api/news.ts)

```typescript
export const newsApi = {
  // Public endpoints
  getNews: (params?: PaginationParams & NewsFilter) =>
    Promise<PaginatedResponse<NewsArticle>>,
  getNewsArticle: (slug: string) => Promise<NewsArticle>,
  getNewsCategories: () => Promise<NewsCategory[]>,
  getTrendingNews: (limit?: number) => Promise<NewsArticle[]>,

  // Admin endpoints
  createNews: (data: CreateNewsData) => Promise<NewsArticle>,
  updateNews: (id: number, data: UpdateNewsData) => Promise<NewsArticle>,
  deleteNews: (id: number) => Promise<void>,
  uploadNewsImage: (file: File) => Promise<{ url: string }>,
};
```

### 1.2 News Public Interface

#### 1.2.1 News Listing Page (src/app/news/page.tsx)

```typescript
// Features:
- Paginated news articles grid
- Category filtering sidebar
- Search functionality
- Sort options (date, popularity, alphabetical)
- Featured articles section
- Newsletter subscription CTA
- SEO optimization with metadata
```

#### 1.2.2 News Article Page (src/app/news/[slug]/page.tsx)

```typescript
// Features:
- Full article content with rich text
- Author information and bio
- Publication date and read time
- Social sharing buttons
- Related articles suggestions
- Comment system (future enhancement)
- Print-friendly version
- SEO optimization
```

#### 1.2.3 News Components

##### News Card (src/components/features/news/NewsCard.tsx)

```typescript
interface NewsCardProps {
  article: NewsArticle;
  variant: 'standard' | 'featured' | 'compact';
  showAuthor?: boolean;
  showExcerpt?: boolean;
  showCategory?: boolean;
}

// Features:
- Responsive card layout
- Featured image with lazy loading
- Category badges
- Author avatars
- Read time estimation
- Hover effects and animations
```

##### News Filter Sidebar (src/components/features/news/NewsFilterSidebar.tsx)

```typescript
interface NewsFilterSidebarProps {
  categories: NewsCategory[];
  selectedFilters: NewsFilter;
  onFilterChange: (filters: NewsFilter) => void;
  isLoading?: boolean;
}

// Features:
- Category checkboxes
- Date range picker
- Tag cloud
- Search input
- Clear filters button
- Collapsible sections
```

##### News Hero Section (src/components/features/news/NewsHeroSection.tsx)

```typescript
// Features:
- Latest featured article
- Breaking news ticker
- Quick navigation to categories
- Search bar integration
```

### 1.3 Events Architecture

#### 1.3.1 Event Data Types (src/types/events.ts)

```typescript
export interface Event {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  featuredImage?: string;
  gallery?: string[];
  eventDate: string;
  endDate?: string;
  location: string;
  venue?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  registrationUrl?: string;
  registrationDeadline?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  price?: number;
  currency?: string;
  category: EventCategory;
  tags: string[];
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isPublic: boolean;
  requiresRegistration: boolean;
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

export interface EventFilter {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  status?: string;
  requiresRegistration?: boolean;
  search?: string;
}
```

#### 1.3.2 Events API Integration (src/lib/api/events.ts)

```typescript
export const eventsApi = {
  // Public endpoints
  getEvents: (params?: PaginationParams & EventFilter) =>
    Promise<PaginatedResponse<Event>>,
  getEvent: (slug: string) => Promise<Event>,
  getEventCategories: () => Promise<EventCategory[]>,
  getUpcomingEvents: (limit?: number) => Promise<Event[]>,
  registerForEvent: (eventId: number, userData: EventRegistrationData) =>
    Promise<void>,

  // Admin endpoints
  createEvent: (data: CreateEventData) => Promise<Event>,
  updateEvent: (id: number, data: UpdateEventData) => Promise<Event>,
  deleteEvent: (id: number) => Promise<void>,
  uploadEventImage: (file: File) => Promise<{ url: string }>,
  getEventAttendees: (eventId: number) => Promise<EventAttendee[]>,
};
```

### 1.4 Events Public Interface

#### 1.4.1 Events Listing Page (src/app/events/page.tsx)

```typescript
// Features:
- Calendar view and list view toggle
- Upcoming/past events filtering
- Category filtering
- Location-based filtering
- Search functionality
- Event registration CTAs
- Export to calendar functionality
```

#### 1.4.2 Event Detail Page (src/app/events/[slug]/page.tsx)

```typescript
// Features:
- Event details and description
- Date, time, and location information
- Interactive map with venue location
- Registration button/form
- Event gallery
- Share functionality
- Add to calendar buttons
- Related events suggestions
```

#### 1.4.3 Event Components

##### Event Card (src/components/features/events/EventCard.tsx)

```typescript
interface EventCardProps {
  event: Event;
  variant: 'standard' | 'featured' | 'compact' | 'calendar';
  showRegistration?: boolean;
  showLocation?: boolean;
}

// Features:
- Event date and time display
- Location information
- Registration status
- Attendee count
- Price information
- Quick registration button
```

##### Event Calendar (src/components/features/events/EventCalendar.tsx)

```typescript
// Features:
- Monthly calendar view
- Event dots/indicators
- Click to view event details
- Navigation between months
- Today highlighting
- Mobile-responsive
```

##### Event Registration Form (src/components/features/events/EventRegistrationForm.tsx)

```typescript
interface EventRegistrationFormProps {
  event: Event;
  onSubmit: (data: EventRegistrationData) => void;
  isLoading?: boolean;
}

// Features:
- User information collection
- Terms and conditions acceptance
- Payment integration (if required)
- Confirmation email notification
- Registration deadline validation
```

## 2. Media Gallery System (FEAT-04)

### 2.1 Gallery Architecture

#### 2.1.1 Media Data Types (src/types/media.ts)

```typescript
export interface MediaItem {
  id: number;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  altText?: string;
  fileSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedBy: number;
  uploader?: User;
  album?: MediaAlbum;
  albumId?: number;
  tags: string[];
  capturedAt?: string;
  uploadedAt: string;
  isPublic: boolean;
  downloadCount: number;
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
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface MediaFilter {
  album?: string;
  type?: 'image' | 'video';
  tag?: string;
  uploader?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}
```

#### 2.1.2 Media API Integration (src/lib/api/media.ts)

```typescript
export const mediaApi = {
  // Public endpoints
  getMedia: (params?: PaginationParams & MediaFilter) =>
    Promise<PaginatedResponse<MediaItem>>,
  getMediaItem: (slug: string) => Promise<MediaItem>,
  getAlbums: (params?: PaginationParams) =>
    Promise<PaginatedResponse<MediaAlbum>>,
  getAlbum: (slug: string) => Promise<MediaAlbum>,
  downloadMedia: (id: number) => Promise<Blob>,

  // Admin endpoints
  uploadMedia: (files: File[], albumId?: number) => Promise<MediaItem[]>,
  createAlbum: (data: CreateAlbumData) => Promise<MediaAlbum>,
  updateMedia: (id: number, data: UpdateMediaData) => Promise<MediaItem>,
  deleteMedia: (id: number) => Promise<void>,
  organizeMedia: (mediaIds: number[], albumId: number) => Promise<void>,
};
```

### 2.2 Gallery Public Interface

#### 2.2.1 Gallery Main Page (src/app/gallery/page.tsx)

```typescript
// Features:
- Album grid layout
- Featured photos/videos carousel
- Recent uploads section
- Search and filtering
- View toggle (grid/masonry/list)
- Album statistics
```

#### 2.2.2 Album View Page (src/app/gallery/[slug]/page.tsx)

```typescript
// Features:
- Album details and description
- Photo/video grid with lightbox
- Download album functionality
- Share album functionality
- Slideshow mode
- Metadata display for each item
```

#### 2.2.3 Media Viewer (src/app/gallery/[albumSlug]/[mediaSlug]/page.tsx)

```typescript
// Features:
- Full-size media display
- Navigation between items
- Zoom functionality for images
- Video player controls
- Download button
- Share functionality
- Metadata information
```

#### 2.2.4 Gallery Components

##### Media Grid (src/components/features/gallery/MediaGrid.tsx)

```typescript
interface MediaGridProps {
  items: MediaItem[];
  layout: 'grid' | 'masonry' | 'list';
  onItemClick: (item: MediaItem) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

// Features:
- Responsive grid layouts
- Lazy loading with intersection observer
- Hover effects and animations
- Video thumbnail previews
- Selection mode for admin
```

##### Lightbox Gallery (src/components/features/gallery/LightboxGallery.tsx)

```typescript
interface LightboxGalleryProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Features:
- Full-screen image/video viewing
- Keyboard navigation
- Touch gestures for mobile
- Zoom and pan for images
- Download and share buttons
- Metadata overlay
```

##### Album Card (src/components/features/gallery/AlbumCard.tsx)

```typescript
interface AlbumCardProps {
  album: MediaAlbum;
  showItemCount?: boolean;
  showCreator?: boolean;
  variant: 'standard' | 'featured' | 'compact';
}

// Features:
- Album cover image
- Item count display
- Creator information
- Hover preview of album contents
- Quick access actions
```

##### Media Upload (src/components/features/gallery/MediaUpload.tsx)

```typescript
interface MediaUploadProps {
  albumId?: number;
  onUploadComplete: (items: MediaItem[]) => void;
  acceptedTypes: string[];
  maxFileSize: number;
}

// Features:
- Drag and drop interface
- Multiple file selection
- Upload progress indicators
- Image preview and cropping
- Metadata input forms
- Batch operations
```

## 3. Content Management Admin Interface

### 3.1 Admin Dashboard Overview

#### 3.1.1 Content Dashboard (src/app/(dashboard)/admin/content/page.tsx)

```typescript
// Features:
- Content statistics overview
- Recent activities feed
- Quick actions menu
- Content moderation queue
- Performance metrics
```

#### 3.1.2 News Management (src/app/(dashboard)/admin/content/news/page.tsx)

```typescript
// Features:
- News articles table with filters
- Bulk actions (publish, archive, delete)
- Draft management
- Publication scheduling
- SEO preview
- Analytics integration
```

#### 3.1.3 Events Management (src/app/(dashboard)/admin/content/events/page.tsx)

```typescript
// Features:
- Events calendar and list view
- Registration management
- Attendee lists and communication
- Event analytics
- Recurring events setup
```

#### 3.1.4 Media Management (src/app/(dashboard)/admin/content/media/page.tsx)

```typescript
// Features:
- Media library browser
- Bulk upload and organization
- Storage usage monitoring
- CDN management
- Image optimization tools
```

### 3.2 Content Editor Components

#### 3.2.1 Rich Text Editor (src/components/features/admin/RichTextEditor.tsx)

```typescript
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  mediaUploadHandler?: (file: File) => Promise<string>;
}

// Features:
- WYSIWYG editing
- Media embedding
- Link management
- Table creation
- Code syntax highlighting
- Auto-save functionality
```

#### 3.2.2 SEO Editor (src/components/features/admin/SEOEditor.tsx)

```typescript
interface SEOEditorProps {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
  onChange: (seoData: SEOData) => void;
}

// Features:
- Meta title and description
- Keyword management
- Slug editing
- Social media previews
- SEO score calculation
```

#### 3.2.3 Content Scheduler (src/components/features/admin/ContentScheduler.tsx)

```typescript
// Features:
- Publication date/time picker
- Timezone management
- Recurring publication
- Draft management
- Publication preview
```

## 4. Search and Filtering System

### 4.1 Global Search (src/components/common/GlobalSearch.tsx)

```typescript
interface SearchResult {
  type: 'news' | 'event' | 'media' | 'alumni';
  id: number;
  title: string;
  excerpt?: string;
  url: string;
  thumbnail?: string;
  date?: string;
}

// Features:
- Universal search across content types
- Auto-complete suggestions
- Recent searches
- Search result categorization
- Advanced filter options
```

### 4.2 Filter Components

#### 4.2.1 Date Range Picker (src/components/common/DateRangePicker.tsx)

```typescript
// Features:
- Calendar popup interface
- Preset ranges (last week, month, year)
- Custom date selection
- Timezone handling
- Validation and error states
```

#### 4.2.2 Multi-Select Filter (src/components/common/MultiSelectFilter.tsx)

```typescript
// Features:
- Searchable dropdown
- Multiple selection
- Clear all functionality
- Custom option rendering
- Loading states
```

## 5. Performance and Optimization

### 5.1 Image Optimization

```typescript
// Implementation:
- Next.js Image component usage
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading with blur placeholders
- CDN integration
```

### 5.2 Content Caching

```typescript
// Strategy:
- Static site generation for published content
- Incremental static regeneration
- Browser caching headers
- API response caching
- Image CDN caching
```

### 5.3 Database Optimization

```typescript
// Considerations:
- Indexed search fields
- Pagination efficiency
- Query optimization
- Connection pooling
- Full-text search implementation
```

## File Structure for Phase 3

```
src/
├── app/
│   ├── news/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── category/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── events/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── calendar/
│   │       └── page.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── [albumSlug]/
│   │       └── [mediaSlug]/
│   │           └── page.tsx
│   └── (dashboard)/
│       └── admin/
│           └── content/
│               ├── page.tsx
│               ├── news/
│               ├── events/
│               └── media/
├── components/
│   ├── features/
│   │   ├── news/
│   │   │   ├── NewsCard.tsx
│   │   │   ├── NewsFilterSidebar.tsx
│   │   │   ├── NewsHeroSection.tsx
│   │   │   └── NewsEditor.tsx
│   │   ├── events/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventCalendar.tsx
│   │   │   ├── EventRegistrationForm.tsx
│   │   │   └── EventEditor.tsx
│   │   ├── gallery/
│   │   │   ├── MediaGrid.tsx
│   │   │   ├── LightboxGallery.tsx
│   │   │   ├── AlbumCard.tsx
│   │   │   ├── MediaUpload.tsx
│   │   │   └── MediaEditor.tsx
│   │   └── admin/
│   │       ├── RichTextEditor.tsx
│   │       ├── SEOEditor.tsx
│   │       ├── ContentScheduler.tsx
│   │       └── AdminDataTable.tsx
│   └── common/
│       ├── GlobalSearch.tsx
│       ├── DateRangePicker.tsx
│       └── MultiSelectFilter.tsx
├── lib/
│   ├── api/
│   │   ├── news.ts
│   │   ├── events.ts
│   │   └── media.ts
│   └── validations/
│       ├── news.ts
│       ├── events.ts
│       └── media.ts
└── types/
    ├── content.ts
    ├── events.ts
    └── media.ts
```

## Deliverables Checklist

### News System (FEAT-03)

- [ ] News listing page with filtering
- [ ] Individual news article pages
- [ ] News categories and tagging
- [ ] Admin news management interface
- [ ] Rich text editor for content creation
- [ ] SEO optimization for articles

### Events System (FEAT-03)

- [ ] Events listing and calendar view
- [ ] Event detail pages
- [ ] Event registration system
- [ ] Admin event management
- [ ] Event categorization and filtering
- [ ] Calendar export functionality

### Media Gallery (FEAT-04)

- [ ] Gallery overview and album browsing
- [ ] Album and individual media pages
- [ ] Lightbox viewing experience
- [ ] Media upload and organization
- [ ] Admin media management
- [ ] Download and sharing features

### Admin Interface

- [ ] Content management dashboard
- [ ] Rich text editing capabilities
- [ ] Media library management
- [ ] Publication scheduling
- [ ] Content analytics and metrics

### Technical Features

- [ ] Search and filtering system
- [ ] Performance optimization
- [ ] Mobile responsive design
- [ ] SEO implementation
- [ ] Accessibility compliance

## Success Criteria

- All content types display correctly
- Admin can create, edit, and manage content
- Search and filtering work efficiently
- Media uploads and gallery function properly
- Performance metrics meet targets
- Mobile experience is smooth
- SEO metadata is properly implemented

## Risk Mitigation

- **Large media files**: Implement compression and CDN
- **Search performance**: Use indexed database fields
- **Content editor complexity**: Provide user training
- **Mobile upload issues**: Test extensively on devices
- **SEO implementation**: Use structured data and meta tags
