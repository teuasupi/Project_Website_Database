// Alumni-specific types for Phase 4 implementation

import { User } from './index';

// Extended Alumni Profile
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
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
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

export interface ThesisInfo {
  title: string;
  advisor: string;
  year: number;
  abstract?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  verified: boolean;
  issuer?: string;
}

export interface Language {
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  location?: string;
  industry?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsements: number;
  verified: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username?: string;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'alumni-only' | 'private';
  contactInfoVisible: boolean;
  workInfoVisible: boolean;
  allowMessages: boolean;
  allowMentorshipRequests: boolean;
  showInDirectory: boolean;
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

// Alumni Directory Filtering
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

// Alumni Articles
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

// Connections and Networking
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

// Mentorship System
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

// Registration System
export interface RegistrationStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
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

export interface VerificationStatus {
  email: boolean;
  documents: boolean;
  academic: boolean;
  manual: boolean;
  overall: 'pending' | 'verified' | 'rejected';
}

export interface PendingRegistration {
  id: string;
  data: RegistrationData;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
  rejectionReason?: string;
}
