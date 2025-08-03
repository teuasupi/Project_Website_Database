# Project Guide: IKA TEUAS UPI Website

**Version:** 2.0  
**Date:** August 3, 2025  
**Last Updated:** Complete rewrite reflecting current production-ready state

## 1. Overview

This document provides comprehensive context, conventions, and workflow for the **IKA TEUAS UPI alumni platform**. The project is a **sophisticated frontend with disconnected backend** - beautiful UI exists but needs integration work.

**Current Status:** ⚠️ **FRONTEND COMPLETE, BACKEND DISCONNECTED** - UI is polished but no API integration yet.

For detailed features and requirements, refer to **[PRD.md](PRD.md)**.  
For implementation phases, see **[plans/](plans/)** directory.

## 2. Core Mandates for AI Contribution

As an AI assistant, you must adhere to these principles:

1. **Integration Focus:** The **primary goal** is connecting the beautiful frontend to the backend API. Frontend UI is complete but uses mock data. Backend exists but isn't connected.

2. **Maintain Architecture:** The project uses a sophisticated **Turbo monorepo** structure. The architecture is sound - focus on integration, not restructuring.

3. **TypeScript First:** Both frontend and backend are **fully TypeScript**. Maintain strict typing when adding integration code.

4. **API Integration Priority:** The main work needed is:
   - Connect frontend forms to backend endpoints
   - Fix endpoint mismatches (frontend calls `/api/auth/*`, backend has `/user/*`)
   - Replace mock data with real API calls
   - Implement proper authentication flow

5. **Test Integration:** Always test API connections and run `npm run lint` and `npm run type-check`.

6. **UI/UX Flexibility:** The frontend is well-designed but may need adjustments. Be open to UI improvements while focusing on backend integration.

## 3. Technology Stack

### Architecture
- **Monorepo:** Turbo-managed workspace with 3 packages
- **Package Manager:** npm with workspaces
- **Build System:** Turbo for parallel builds and caching

### Backend (`@teuas/backend`)
- **Language:** TypeScript (100% coverage)
- **Framework:** Express.js with structured middleware
- **Database:** MariaDB with connection pooling
- **Authentication:** JWT with bcrypt password hashing
- **Email:** Nodemailer integration
- **File Upload:** Multer for profile photos

### Frontend (`@teuas/frontend`)
- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript with strict typing
- **Styling:** Tailwind CSS 4.0
- **Components:** shadcn/ui (40+ components)
- **Authentication:** NextAuth.js with custom provider
- **Forms:** React Hook Form with Zod validation
- **Animations:** Framer Motion

### Shared (`@teuas/shared`)
- **Types:** Centralized type definitions
- **Utils:** Logger and common utilities
- **Constants:** Shared configuration

## 4. Project Structure

```
teuas-website/                    # Turbo monorepo root
├── backend/                      # @teuas/backend
│   ├── src/
│   │   ├── controllers/          # API route handlers
│   │   ├── models/               # Database models
│   │   ├── middlewares/          # Auth, validation, error handling
│   │   ├── routes/               # Express routes
│   │   ├── config/               # Database configuration
│   │   └── types/                # Backend type definitions
│   ├── dist/                     # Compiled JavaScript
│   └── package.json
├── frontend/                     # @teuas/frontend
│   ├── src/
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── (18 implemented pages)
│   │   │   ├── api/auth/         # NextAuth configuration
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   ├── features/         # Feature-specific components
│   │   │   ├── layout/           # Header, Footer, etc.
│   │   │   └── common/           # Shared components
│   │   ├── lib/
│   │   │   ├── api/              # API client and endpoints
│   │   │   ├── auth/             # NextAuth configuration
│   │   │   ├── constants/        # App configuration
│   │   │   └── validations/      # Zod schemas
│   │   └── types/                # Frontend type definitions
│   └── public/                   # Static assets
├── shared/                       # @teuas/shared
│   ├── src/
│   │   ├── types/                # Shared types
│   │   ├── utils/                # Logger, utilities
│   │   └── constants/            # Shared constants
│   └── dist/                     # Compiled output
├── plans/                        # Implementation documentation
├── turbo.json                    # Turbo configuration
└── package.json                  # Root workspace config
```

## 5. Development Workflow

### Quick Start
```bash
# Install all dependencies
npm install

# Start all services in development
npm run dev

# Or start individual services
npm run frontend    # Frontend only
npm run backend     # Backend only
npm run shared      # Shared package watch mode
```

### Available Commands
```bash
# Development
npm run dev           # All packages in development mode
npm run build         # Build all packages
npm run lint          # Lint all packages
npm run type-check    # TypeScript checking
npm run format        # Format with Prettier

# Individual packages
npm run frontend      # turbo dev --filter=@teuas/frontend
npm run backend       # turbo dev --filter=@teuas/backend
npm run shared        # turbo dev --filter=@teuas/shared
```

### Package-Specific Commands
```bash
# Backend (@teuas/backend)
cd backend
npm run dev           # nodemon with TypeScript
npm run build         # tsc compilation
npm run start         # Run compiled JavaScript

# Frontend (@teuas/frontend)
cd frontend
npm run dev           # Next.js dev with Turbopack
npm run build         # Next.js production build
npm run start         # Next.js production server

# Shared (@teuas/shared)
cd shared
npm run dev           # TypeScript watch mode
npm run build         # Compile TypeScript
```

## 6. Implemented Features

### ✅ Frontend Complete (18 Pages)

**Core Pages:**
- Homepage with hero section and highlights ✅
- About page with mission/vision ✅
- Contact page with services info ✅

**Authentication UI:**
- Login page with beautiful forms ✅ (but no backend connection ❌)
- Register page with validation ✅ (but no backend connection ❌)
- NextAuth setup exists ✅ (but endpoints don't match ❌)

**Alumni Features:**
- Alumni directory with filters ✅ (using mock data ❌)
- Individual alumni profiles ✅ (using mock data ❌)
- Alumni statistics display ✅ (using mock data ❌)

**Content Pages:**
- News section ✅ (using mock data ❌)
- Events system ✅ (using mock data ❌)
- Media gallery ✅ (using mock data ❌)
- Scholarships ✅ (using mock data ❌)
- Privacy/Terms pages ✅

### ❌ Missing API Integration
- **No backend-frontend communication**
- **No real authentication** (forms exist but don't work)
- **No real data** (everything uses mock data)
- **Endpoint mismatches** (frontend → `/api/auth/*`, backend → `/user/*`)
- **No file upload** working
- **No email notifications** connected

## 7. Database Schema

**Current Database:** MariaDB (`TEUAS`)

**Users Table Structure:**
```sql
Users (
  id: number (PK),
  email: string (unique),
  fullName: string,
  password: string (hashed),
  graduationYear: number?,
  nim: string?,
  major: string?,
  phoneNumber: string?,
  address: string?,
  profilePhoto: string?,
  role: 'admin' | 'user',
  currentCompany: string?,
  position: string?
)
```

## 8. Coding Conventions

### TypeScript
- **Strict typing:** All functions, props, and variables must be typed
- **Interface naming:** Use `PascalCase` (e.g., `UserProfile`, `ApiResponse`)
- **Enums:** Use `const` assertions for better type safety

### React/Next.js
- **Components:** `PascalCase` with descriptive names
- **Props:** Use interfaces, not types for component props
- **File naming:** `kebab-case` for files, `PascalCase` for components

### API Design
- **RESTful:** Follow REST principles
- **Endpoints:** `/api/users`, `/api/users/:id`
- **Responses:** Consistent `ApiResponse<T>` structure
- **Error handling:** Proper HTTP status codes

### Styling
- **Tailwind:** Utility-first approach
- **Components:** Use shadcn/ui for consistency
- **Responsive:** Mobile-first design
- **Dark mode:** Ready for implementation

## 9. Current Status & Next Steps

### ✅ Completed
- **Frontend UI** - Complete, beautiful, responsive
- **Backend API structure** - Routes exist, TypeScript, database models
- **Component library** - 40+ shadcn/ui components
- **Type safety** - Strict TypeScript across all packages
- **Database setup** - MariaDB with user model

### 🚨 **CRITICAL WORK NEEDED**
1. **Fix endpoint mismatches** - Align frontend calls with backend routes
2. **Connect authentication** - Make login/register actually work
3. **Replace mock data** - Connect frontend to real API calls
4. **API integration** - Frontend forms → Backend endpoints
5. **Environment setup** - Production configuration
6. **Testing integration** - Ensure API calls work

### 🔄 Future Enhancements (After Integration)
- Admin dashboard for content management
- Advanced search and filtering  
- Email subscription system
- Performance optimizations
- Testing suite implementation

### ⚠️ **NOT Deployment Ready Yet**
**Frontend** is deployment ready:
- SEO optimization ✅
- Performance considerations ✅
- Beautiful responsive UI ✅

**Backend** needs work:
- No deployment configuration ❌
- No environment setup ❌ 
- Not connected to frontend ❌

## 10. Important Notes

### For AI Assistants
1. **This is a DISCONNECTED project** - beautiful frontend exists but no backend integration
2. **PRIMARY GOAL: Connect frontend to backend** - not building from scratch, connecting existing pieces
3. **Focus on Integration work:** Fix endpoint mismatches, connect APIs, replace mock data
4. **TypeScript is non-negotiable** - maintain strict typing during integration
5. **Test your changes** - always run `npm run lint` and `npm run type-check`
6. **UI improvements welcome** - frontend may need rework alongside integration

### Development Guidelines
- **Read existing code** before making changes
- **Follow established patterns** in the codebase
- **Update types** when adding new features
- **Consider cross-package implications** when making changes
- **Document significant changes** in commit messages

---

**Remember:** This is a sophisticated but **disconnected** application. The frontend is polished, the backend exists, but they don't talk to each other yet. Focus on **integration work** to make them communicate properly.