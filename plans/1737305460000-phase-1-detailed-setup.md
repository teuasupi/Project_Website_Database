# Phase 1 Detailed Plan: Project Setup & Core Infrastructure

**Date:** July 19, 2025
**Phase:** 1 of 6
**Estimated Time:** 2-3 days

## 1. Dependencies Installation

### Essential Dependencies
```bash
# Core functionality
npm install axios react-hook-form @hookform/resolvers zod
npm install next-auth @next-auth/prisma-adapter
npm install framer-motion
npm install date-fns
npm install @radix-ui/react-toast
npm install sonner # for toast notifications

# Development dependencies
npm install -D @types/bcryptjs
```

### shadcn/ui Components to Install
```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add card
npx shadcn@latest add navigation-menu
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add toast
npx shadcn@latest add tabs
npx shadcn@latest add separator
npx shadcn@latest add skeleton
```

## 2. Project Structure Creation

### Directory Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   └── admin/
│   ├── about/
│   ├── alumni/
│   ├── articles/
│   ├── contact/
│   ├── events/
│   ├── gallery/
│   ├── news/
│   └── scholarship/
├── components/
│   ├── ui/ (shadcn components)
│   ├── layout/
│   ├── forms/
│   ├── common/
│   └── features/
│       ├── alumni/
│       ├── articles/
│       ├── events/
│       └── gallery/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── constants/
│   └── validations/
├── types/
├── hooks/
└── styles/
```

## 3. TypeScript Configuration

### Types to Create
- `src/types/index.ts` - Main type definitions
- `src/types/api.ts` - API response types
- `src/types/auth.ts` - Authentication types
- `src/types/components.ts` - Component prop types

### Key Interfaces
```typescript
// User types matching backend
interface User {
  id: number;
  email: string;
  fullName: string;
  graduationYear?: number;
  nim?: string;
  major?: string;
  phoneNumber?: string;
  address?: string;
  profilePhoto?: string;
  role: "admin" | "user";
  currentCompany?: string;
  position?: string;
}

// API response types
interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}

// Navigation types
interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}
```

## 4. API Client Setup

### Files to Create
- `src/lib/api/client.ts` - Axios instance configuration
- `src/lib/api/endpoints.ts` - API endpoint constants
- `src/lib/api/users.ts` - User-related API calls
- `src/lib/api/auth.ts` - Authentication API calls

### API Client Configuration
```typescript
// Basic structure for API client
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request/Response interceptors for auth tokens
// Error handling
// Type-safe API methods
```

## 5. Authentication Setup

### NextAuth Configuration
- `src/lib/auth/auth-config.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API routes
- `src/lib/auth/auth-options.ts` - Auth options and providers

### Authentication Features
- JWT provider integration with backend
- Custom login/register pages
- Protected route middleware
- Auth context and hooks

## 6. Global Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Global Styles Update
- Update `src/app/globals.css` with custom CSS variables
- TEUAS brand colors and typography
- Custom component styles

## 7. Layout Components

### Core Layout Components
- `src/components/layout/Header.tsx` - Main navigation header
- `src/components/layout/Footer.tsx` - Site footer
- `src/components/layout/Navigation.tsx` - Navigation component
- `src/components/layout/Sidebar.tsx` - Admin sidebar (if needed)

## 8. Utility Functions

### Helper Functions
- `src/lib/utils.ts` - General utilities (extend existing)
- `src/lib/constants/navigation.ts` - Navigation configuration
- `src/lib/constants/site.ts` - Site metadata and constants
- `src/lib/validations/auth.ts` - Form validation schemas

## 9. Development Configuration

### Scripts Update (package.json)
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## 10. Testing Setup (Optional for Phase 1)
- Basic testing configuration
- Test utilities for components

## Checklist for Phase 1 Completion

- [ ] All dependencies installed successfully
- [ ] Project directory structure created
- [ ] TypeScript types defined
- [ ] API client configured and tested
- [ ] NextAuth authentication setup
- [ ] Environment variables configured
- [ ] Global styles updated
- [ ] Core layout components created
- [ ] Navigation structure defined
- [ ] Development environment verified
- [ ] Build process working
- [ ] TypeScript compilation successful

## Success Criteria
- Frontend development server runs without errors
- TypeScript compilation passes
- Basic authentication flow works
- API client can communicate with backend
- All shadcn/ui components properly installed
- Project structure follows Next.js best practices