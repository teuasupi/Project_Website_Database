# Phase 4 Detailed Plan: Alumni Features

**Date:** July 19, 2025
**Author:** Ramdan
**Phase:** 4 of 6
**Estimated Time:** 5-6 days
**Dependencies:** Phase 1 (Infrastructure), Phase 2 (Layout), Phase 3 (Content Management) must be completed
**Status:** Draft📝

## Overview

This phase implements the core alumni-focused features as defined in PRD features FEAT-06 (Alumni Database & Profiles), FEAT-07 (Member Registration), and FEAT-08 (Alumni Blog & Articles). These are the most complex features requiring sophisticated user management, profile systems, and content creation capabilities.

## 1. Alumni Registration System (FEAT-07)

### 1.1 Registration Architecture

#### 1.1.1 Registration Data Types (src/types/registration.ts)

```typescript
export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  validation: z.ZodSchema;
  isRequired: boolean;
  order: number;
}

export interface FormField {
  name: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'textarea'
    | 'file'
    | 'date'
    | 'number';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation: z.ZodSchema;
  isRequired: boolean;
  helpText?: string;
  dependsOn?: string;
}

export interface RegistrationData {
  // Step 1: Basic Information
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;

  // Step 2: Academic Information
  nim: string;
  major: string;
  graduationYear: number;
  gpa?: number;
  thesis?: {
    title: string;
    advisor: string;
    year: number;
  };

  // Step 3: Personal Information
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };

  // Step 4: Professional Information
  currentCompany?: string;
  position?: string;
  industry?: string;
  workExperience?: WorkExperience[];
  skills?: string[];
  linkedinUrl?: string;

  // Step 5: Additional Information
  profilePhoto?: File;
  resume?: File;
  interests?: string[];
  willingToMentor?: boolean;
  seekingMentorship?: boolean;
  privacySettings: PrivacySettings;

  // Step 6: Verification
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  marketingOptIn?: boolean;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  location?: string;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'alumni-only' | 'private';
  contactInfoVisible: boolean;
  workInfoVisible: boolean;
  allowMessages: boolean;
  allowMentorshipRequests: boolean;
  showInDirectory: boolean;
}
```

#### 1.1.2 Multi-Step Registration Form (src/app/(auth)/register/page.tsx)

```typescript
// Features:
- 6-step progressive registration
- Progress indicator
- Form state persistence
- Validation per step
- Back/forward navigation
- Auto-save drafts
- Email verification
- University verification process
```

#### 1.1.3 Registration Components

##### Registration Wizard (src/components/features/registration/RegistrationWizard.tsx)

```typescript
interface RegistrationWizardProps {
  steps: RegistrationStep[];
  currentStep: number;
  data: Partial<RegistrationData>;
  onStepChange: (step: number) => void;
  onDataChange: (data: Partial<RegistrationData>) => void;
  onSubmit: (data: RegistrationData) => void;
}

// Features:
- Step-by-step form navigation
- Progress visualization
- Form validation per step
- Data persistence between steps
- Mobile-responsive design
```

##### Step Components

```typescript
// BasicInfoStep.tsx - Step 1
- Email and password setup
- Full name input
- Email availability check
- Password strength indicator
- Terms acceptance

// AcademicInfoStep.tsx - Step 2
- NIM verification
- Major selection
- Graduation year
- Academic achievements
- Thesis information

// PersonalInfoStep.tsx - Step 3
- Contact information
- Address (with autocomplete)
- Personal details
- Emergency contact

// ProfessionalInfoStep.tsx - Step 4
- Current employment
- Work history builder
- Skills selection
- Professional links

// AdditionalInfoStep.tsx - Step 5
- Profile photo upload
- Resume upload
- Interests and hobbies
- Mentorship preferences

// VerificationStep.tsx - Step 6
- Email verification
- Document verification
- Final review
- Submission confirmation
```

#### 1.1.4 Verification System (src/components/features/registration/VerificationSystem.tsx)

```typescript
// Features:
- Email verification with token
- Academic credential verification
- Document upload validation
- Manual admin approval process
- Verification status tracking
- Notification system
```

### 1.2 Registration API Integration (src/lib/api/registration.ts)

```typescript
export const registrationApi = {
  // Registration flow
  checkEmailAvailability: (email: string) => Promise<{ available: boolean }>,
  verifyNIM: (nim: string, graduationYear: number) =>
    Promise<{ valid: boolean }>,
  uploadDocument: (file: File, type: 'resume' | 'photo' | 'verification') =>
    Promise<{ url: string }>,
  saveDraft: (data: Partial<RegistrationData>) => Promise<void>,
  loadDraft: (email: string) => Promise<Partial<RegistrationData>>,
  submitRegistration: (data: RegistrationData) =>
    Promise<{ id: string; status: string }>,

  // Verification
  sendVerificationEmail: (email: string) => Promise<void>,
  verifyEmail: (token: string) => Promise<{ success: boolean }>,
  checkVerificationStatus: (registrationId: string) =>
    Promise<VerificationStatus>,

  // Admin
  getPendingRegistrations: () => Promise<PendingRegistration[]>,
  approveRegistration: (id: string) => Promise<void>,
  rejectRegistration: (id: string, reason: string) => Promise<void>,
};
```

## 2. Alumni Database & Profiles (FEAT-06)

### 2.1 Profile System Architecture

#### 2.1.1 Extended User Profile Types (src/types/alumni.ts)

```typescript
export interface AlumniProfile extends User {
  // Academic Information
  nim: string;
  major: string;
  graduationYear: number;
  gpa?: number;
  thesis?: ThesisInfo;
  academicAchievements?: Achievement[];

  // Personal Information
  dateOfBirth?: string;
  gender?: string;
  maritalStatus?: string;
  bio?: string;
  interests: string[];
  languages: Language[];

  // Professional Information
  currentCompany?: string;
  position?: string;
  industry?: string;
  workExperience: WorkExperience[];
  skills: Skill[];
  certifications: Certification[];

  // Contact & Social
  socialLinks: SocialLink[];
  website?: string;
  linkedinUrl?: string;

  // Settings & Preferences
  privacySettings: PrivacySettings;
  mentorshipInfo: MentorshipInfo;

  // System Information
  profileCompleteness: number;
  lastLoginAt?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  accountStatus: 'active' | 'inactive' | 'suspended';
  joinedAt: string;

  // Statistics
  profileViews: number;
  connectionsCount: number;
  articlesCount: number;
  menteeCount: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsements: number;
  verified: boolean;
}

export interface MentorshipInfo {
  isAvailableAsMentor: boolean;
  mentorshipAreas: string[];
  maxMentees: number;
  currentMentees: number;
  mentoringExperience?: string;
  preferredCommunication: string[];
  seekingMentorship: boolean;
  mentorshipGoals?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  verified: boolean;
}
```

#### 2.1.2 Alumni Directory System

##### Directory Listing (src/app/alumni/page.tsx)

```typescript
// Features:
- Advanced search and filtering
- Grid and list view options
- Sorting by relevance, name, graduation year
- Infinite scroll pagination
- Export functionality
- Saved searches
- Directory statistics
```

##### Profile Filters (src/components/features/alumni/AlumniFilters.tsx)

```typescript
interface AlumniFiltersProps {
  filters: AlumniFilter;
  onFilterChange: (filters: AlumniFilter) => void;
  onClearFilters: () => void;
}

export interface AlumniFilter {
  search?: string;
  graduationYearFrom?: number;
  graduationYearTo?: number;
  major?: string[];
  currentCompany?: string[];
  industry?: string[];
  location?: string[];
  skills?: string[];
  availableForMentorship?: boolean;
  seekingMentorship?: boolean;
  hasProfilePhoto?: boolean;
  profileCompleteness?: number;
}

// Features:
- Text search across name, company, skills
- Graduation year range slider
- Multi-select filters
- Location-based filtering
- Skill-based matching
- Mentorship availability
- Advanced filter modal
```

##### Alumni Cards (src/components/features/alumni/AlumniCard.tsx)

```typescript
interface AlumniCardProps {
  alumni: AlumniProfile;
  variant: 'compact' | 'standard' | 'detailed';
  showActions?: boolean;
  currentUserId?: number;
}

// Features:
- Profile photo and basic info
- Current position and company
- Graduation year and major
- Skills tags
- Mentorship status indicators
- Connection/contact actions
- Privacy-respecting display
```

#### 2.1.3 Individual Profile Pages

##### Public Profile (src/app/alumni/[id]/page.tsx)

```typescript
// Sections:
1. Profile Header (photo, name, title, contact)
2. About/Bio Section
3. Professional Experience
4. Education & Academic Info
5. Skills & Endorsements
6. Articles & Contributions
7. Mentorship Information
8. Contact & Connect Options

// Features:
- Privacy-controlled information display
- Social sharing
- Print-friendly version
- Contact form integration
- Connection requests
- Mentorship requests
```

##### Profile Components

###### Profile Header (src/components/features/alumni/ProfileHeader.tsx)

```typescript
interface ProfileHeaderProps {
  profile: AlumniProfile;
  isOwner: boolean;
  canContact: boolean;
  onContact: () => void;
  onConnect: () => void;
  onMentorshipRequest: () => void;
}

// Features:
- Profile photo with upload option
- Name, title, and company
- Location and contact info
- Social media links
- Action buttons (contact, connect, mentor)
- Privacy-controlled visibility
```

###### Experience Timeline (src/components/features/alumni/ExperienceTimeline.tsx)

```typescript
// Features:
- Chronological work experience
- Education milestones
- Achievements and awards
- Interactive timeline
- Company logos and details
- Duration calculations
```

###### Skills Matrix (src/components/features/alumni/SkillsMatrix.tsx)

```typescript
// Features:
- Categorized skills display
- Skill level indicators
- Endorsement system
- Skill verification badges
- Add/edit skills (owner)
- Skill-based recommendations
```

#### 2.1.4 Profile Management

##### Edit Profile (src/app/alumni/edit/page.tsx)

```typescript
// Features:
- Tabbed editing interface
- Real-time validation
- Auto-save functionality
- Photo cropping tool
- Privacy settings
- Profile completeness indicator
- Preview mode
```

##### Profile Settings (src/components/features/alumni/ProfileSettings.tsx)

```typescript
// Settings Categories:
1. Privacy & Visibility
2. Contact Preferences
3. Notification Settings
4. Mentorship Preferences
5. Account Security
6. Data Export/Delete

// Features:
- Granular privacy controls
- Communication preferences
- Email notification settings
- Account deactivation
- Data portability
```

## 3. Alumni Blog & Articles System (FEAT-08)

### 3.1 Article System Architecture

#### 3.1.1 Article Types (src/types/articles.ts)

```typescript
export interface AlumniArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;

  // Author Information
  authorId: number;
  author: AlumniProfile;
  coAuthors?: AlumniProfile[];

  // Content Metadata
  category: ArticleCategory;
  tags: string[];
  readingTime: number;
  wordCount: number;

  // Publication Status
  status: 'draft' | 'review' | 'published' | 'archived';
  publishedAt?: string;
  lastModifiedAt: string;

  // Engagement Metrics
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;

  // Content Features
  tableOfContents?: TOCItem[];
  relatedArticles?: number[];

  // SEO & Social
  metaDescription?: string;
  socialImage?: string;
  canonicalUrl?: string;

  // Permissions
  allowComments: boolean;
  allowSharing: boolean;
  requiresLogin: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  parentId?: number;
  children?: ArticleCategory[];
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

export interface ArticleComment {
  id: number;
  articleId: number;
  authorId: number;
  author: AlumniProfile;
  content: string;
  parentId?: number;
  replies?: ArticleComment[];
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}
```

#### 3.1.2 Article Management System

##### Article Editor (src/app/alumni/articles/create/page.tsx)

```typescript
// Features:
- Rich text editor with markdown support
- Live preview mode
- Auto-save drafts
- Image upload and management
- SEO optimization tools
- Publication scheduling
- Co-author invitation
- Category and tag management
```

##### Article Dashboard (src/app/alumni/articles/dashboard/page.tsx)

```typescript
// Features:
- Personal article library
- Draft management
- Publication analytics
- Comment moderation
- Performance metrics
- Collaboration tools
```

#### 3.1.3 Article Components

##### Article Editor Component (src/components/features/articles/ArticleEditor.tsx)

```typescript
interface ArticleEditorProps {
  article?: Partial<AlumniArticle>;
  onSave: (article: Partial<AlumniArticle>) => void;
  onPublish: (article: AlumniArticle) => void;
  onPreview: () => void;
  isLoading?: boolean;
}

// Features:
- Rich text editing with media embedding
- Markdown support
- Live character/word count
- Table of contents generation
- SEO preview
- Collaboration features
```

##### Article Card (src/components/features/articles/ArticleCard.tsx)

```typescript
interface ArticleCardProps {
  article: AlumniArticle;
  variant: 'feed' | 'grid' | 'list' | 'featured';
  showAuthor?: boolean;
  showStats?: boolean;
  showActions?: boolean;
}

// Features:
- Article preview with featured image
- Author information and avatar
- Publication date and reading time
- Engagement metrics
- Action buttons (like, share, bookmark)
- Category and tag display
```

##### Article Reader (src/app/alumni/articles/[slug]/page.tsx)

```typescript
// Features:
- Optimized reading experience
- Table of contents navigation
- Progress indicator
- Social sharing buttons
- Related articles suggestions
- Comment system
- Author bio section
- Print-friendly version
```

#### 3.1.4 Article Discovery

##### Article Feed (src/app/alumni/articles/page.tsx)

```typescript
// Features:
- Personalized article feed
- Trending articles section
- Category browsing
- Author following system
- Reading history
- Bookmarked articles
- Advanced search and filtering
```

##### Article Search (src/components/features/articles/ArticleSearch.tsx)

```typescript
// Features:
- Full-text search
- Filter by author, category, date
- Search suggestions
- Recent searches
- Advanced search modal
- Search result analytics
```

## 4. Connection and Networking Features

### 4.1 Alumni Connections

#### 4.1.1 Connection System (src/types/connections.ts)

```typescript
export interface Connection {
  id: number;
  requesterId: number;
  requester: AlumniProfile;
  recipientId: number;
  recipient: AlumniProfile;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  message?: string;
  connectedAt?: string;
  requestedAt: string;
}

export interface ConnectionRequest {
  recipientId: number;
  message?: string;
}
```

#### 4.1.2 Networking Components

##### Connection Button (src/components/features/networking/ConnectionButton.tsx)

```typescript
// Features:
- Connect/disconnect functionality
- Connection status display
- Custom message option
- Mutual connections indicator
```

##### Network Overview (src/components/features/networking/NetworkOverview.tsx)

```typescript
// Features:
- Connections statistics
- Recent connections
- Mutual connections
- Network growth analytics
- Connection suggestions
```

### 4.2 Mentorship System

#### 4.2.1 Mentorship Types (src/types/mentorship.ts)

```typescript
export interface MentorshipRequest {
  id: number;
  mentorId: number;
  mentor: AlumniProfile;
  menteeId: number;
  mentee: AlumniProfile;
  areas: string[];
  message: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  expectedDuration?: string;
  requestedAt: string;
  respondedAt?: string;
}

export interface MentorshipSession {
  id: number;
  mentorshipId: number;
  scheduledAt: string;
  duration: number;
  agenda?: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
```

#### 4.2.2 Mentorship Components

##### Mentor Card (src/components/features/mentorship/MentorCard.tsx)

```typescript
// Features:
- Mentor profile summary
- Expertise areas
- Availability status
- Success metrics
- Request mentorship button
```

##### Mentorship Dashboard (src/components/features/mentorship/MentorshipDashboard.tsx)

```typescript
// Features:
- Active mentorships
- Pending requests
- Session scheduling
- Progress tracking
- Resource sharing
```

## File Structure for Phase 4

```
src/
├── app/
│   ├── (auth)/
│   │   └── register/
│   │       ├── page.tsx
│   │       └── verify/
│   │           └── page.tsx
│   ├── alumni/
│   │   ├── page.tsx                    # Directory
│   │   ├── [id]/
│   │   │   └── page.tsx               # Profile view
│   │   ├── edit/
│   │   │   └── page.tsx               # Edit profile
│   │   ├── articles/
│   │   │   ├── page.tsx               # Article feed
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx           # Article view
│   │   │   ├── create/
│   │   │   │   └── page.tsx           # Article editor
│   │   │   └── dashboard/
│   │   │       └── page.tsx           # Personal articles
│   │   ├── network/
│   │   │   └── page.tsx               # Connections
│   │   └── mentorship/
│   │       ├── page.tsx               # Mentorship hub
│   │       ├── find-mentor/
│   │       └── dashboard/
│   └── (dashboard)/
│       └── admin/
│           ├── users/
│           │   ├── page.tsx
│           │   └── pending/
│           │       └── page.tsx
│           └── content/
│               └── articles/
│                   └── page.tsx
├── components/
│   └── features/
│       ├── registration/
│       │   ├── RegistrationWizard.tsx
│       │   ├── BasicInfoStep.tsx
│       │   ├── AcademicInfoStep.tsx
│       │   ├── PersonalInfoStep.tsx
│       │   ├── ProfessionalInfoStep.tsx
│       │   ├── AdditionalInfoStep.tsx
│       │   ├── VerificationStep.tsx
│       │   └── VerificationSystem.tsx
│       ├── alumni/
│       │   ├── AlumniFilters.tsx
│       │   ├── AlumniCard.tsx
│       │   ├── ProfileHeader.tsx
│       │   ├── ExperienceTimeline.tsx
│       │   ├── SkillsMatrix.tsx
│       │   └── ProfileSettings.tsx
│       ├── articles/
│       │   ├── ArticleEditor.tsx
│       │   ├── ArticleCard.tsx
│       │   ├── ArticleSearch.tsx
│       │   └── ArticleComments.tsx
│       ├── networking/
│       │   ├── ConnectionButton.tsx
│       │   └── NetworkOverview.tsx
│       └── mentorship/
│           ├── MentorCard.tsx
│           └── MentorshipDashboard.tsx
├── lib/
│   ├── api/
│   │   ├── registration.ts
│   │   ├── alumni.ts
│   │   ├── articles.ts
│   │   ├── connections.ts
│   │   └── mentorship.ts
│   └── validations/
│       ├── registration.ts
│       ├── profile.ts
│       └── articles.ts
└── types/
    ├── registration.ts
    ├── alumni.ts
    ├── articles.ts
    ├── connections.ts
    └── mentorship.ts
```

## Deliverables Checklist

### Registration System (FEAT-07)

- [ ] Multi-step registration wizard
- [ ] Academic verification system
- [ ] Document upload functionality
- [ ] Email verification process
- [ ] Admin approval workflow
- [ ] Registration analytics

### Alumni Directory (FEAT-06)

- [ ] Searchable alumni database
- [ ] Advanced filtering system
- [ ] Individual profile pages
- [ ] Profile editing interface
- [ ] Privacy controls
- [ ] Connection system

### Article System (FEAT-08)

- [ ] Article creation and editing
- [ ] Publication workflow
- [ ] Article discovery and search
- [ ] Comment system
- [ ] Author profiles
- [ ] Content analytics

### Networking Features

- [ ] Alumni connections
- [ ] Mentorship system
- [ ] Professional networking
- [ ] Skill endorsements
- [ ] Experience sharing

### Admin Management

- [ ] User approval system
- [ ] Profile moderation
- [ ] Content management
- [ ] Analytics dashboard
- [ ] Bulk operations

## Success Criteria

- Registration completion rate > 80%
- Profile completeness average > 70%
- Active user engagement with directory
- Article publication and reading metrics
- Successful mentorship connections
- Admin efficiency in user management

## Risk Mitigation

- **Privacy concerns**: Robust privacy controls and settings
- **Profile completeness**: Gamification and incentives
- **Content quality**: Moderation and editorial process
- **User verification**: Multi-step verification process
- **Performance**: Efficient search and filtering algorithms
