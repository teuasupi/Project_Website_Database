'use client';

// Authentication provider component

import { ReactNode } from 'react';
import { AuthProvider as SupabaseAuthProvider } from '@/lib/auth/supabase-auth-provider';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>;
}
