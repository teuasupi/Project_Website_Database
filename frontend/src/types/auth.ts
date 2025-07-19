// Authentication and authorization types

import { User } from './index';

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  graduationYear?: number;
  nim?: string;
  major?: string;
  phoneNumber?: string;
  termsAccepted: boolean;
}

export interface ResetPasswordData {
  email: string;
}

export interface NewPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SessionData {
  id: string;
  userId: number;
  deviceInfo: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  lastActivityAt: string;
  isActive: boolean;
}

// NextAuth types extension
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}
