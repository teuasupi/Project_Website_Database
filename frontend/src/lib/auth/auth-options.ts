// NextAuth configuration options

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { AuthResponse } from '@/types';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your.email@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const response = await api.post<AuthResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.data?.user && response.data?.token) {
            return {
              id: response.data.user.id.toString(),
              email: response.data.user.email,
              name: response.data.user.fullName,
              role: response.data.user.role,
              accessToken: response.data.token,
            };
          }

          throw new Error('Invalid credentials');
        } catch (error: any) {
          console.error('Authentication error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          role: user.role,
        };
      }

      // Return previous token if the access token has not expired yet
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },

  debug: process.env.NODE_ENV === 'development',

  events: {
    async signIn({ user }) {
      console.log('User signed in:', { userId: user.id, email: user.email });
    },

    async signOut() {
      console.log('User signed out');
    },

    async session({ session }) {
      // Optional: Log session access for security monitoring
      if (process.env.NODE_ENV === 'development') {
        console.log('Session accessed:', { userId: session.user.id });
      }
    },
  },
};
