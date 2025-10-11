// Authentication and authorization types

import {
  User as SupabaseUser,
  Session as SupabaseSession,
} from '@supabase/supabase-js';

export interface AuthState {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  loading: boolean;
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
