# Backend TypeScript Migration Plan

**Date:** July 19, 2025  
**Plan ID:** 1737295200000-backend-typescript-migration  
**Status:** ✅ Completed

## Overview

This document outlines the complete migration strategy for converting the TEUAS backend from JavaScript to TypeScript, ensuring zero functionality loss while adding type safety.

## Current State Analysis

### File Structure

```
backend/
├── index.js                           # Express server entry point
├── src/
│   ├── config/config.js              # MariaDB connection configuration
│   ├── controllers/user.js           # User business logic
│   ├── models/user.js                # User data access layer
│   ├── middlewares/
│   │   ├── Authentication.js         # JWT authentication
│   │   ├── Authorization.js          # Role-based authorization
│   │   ├── ErrorHandler.js           # Global error handling
│   │   └── upload.js                 # File upload handling
│   ├── routes/
│   │   ├── index.js                  # Main router
│   │   └── user.js                   # User routes
│   └── setup/
│       ├── miggration.js             # Database migrations
│       └── seeder.js                 # Database seeding
└── package.json
```

### Dependencies

- **Runtime:** express, mariadb, bcryptjs, jsonwebtoken, cors, multer, nodemailer, dotenv
- **Dev:** nodemon
- **Missing:** TypeScript toolchain and type definitions

### Code Patterns

- CommonJS modules (`require`/`module.exports`)
- Class-based models and controllers
- Async/await patterns
- Express middleware pattern
- MariaDB connection pooling

## Migration Strategy

### Phase 1: TypeScript Setup & Configuration

#### 1.1 Install Dependencies

```bash
npm install --save-dev typescript @types/node @types/express @types/bcryptjs @types/jsonwebtoken @types/cors @types/multer @types/nodemailer ts-node
```

#### 1.2 TypeScript Configuration

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "index.ts"],
  "exclude": ["node_modules", "dist"]
}
```

#### 1.3 Update Package Scripts

```json
{
  "scripts": {
    "dev": "ts-node index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Phase 2: Type Definitions

#### 2.1 Core Interfaces (`src/types/index.ts`)

```typescript
export interface User {
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
  password?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: Omit<User, "password">;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}
```

#### 2.2 Environment Variables (`src/types/env.d.ts`)

```typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      PASSWORD_GMAIL: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}
```

### Phase 3: File Migration

#### 3.1 Entry Point Migration

- `index.js` → `index.ts`
- Add proper typing for Express app and middleware
- Fix missing `pool` import in test endpoint

#### 3.2 Configuration Migration

- `src/config/config.js` → `src/config/config.ts`
- Add MariaDB connection pool typing
- Export typed pool instance

#### 3.3 Models Migration

- `src/models/user.js` → `src/models/user.ts`
- Add return type annotations for all methods
- Implement proper error handling with typed exceptions
- Add parameter validation with types

#### 3.4 Controllers Migration

- `src/controllers/user.js` → `src/controllers/user.ts`
- Type Express Request/Response objects
- Add proper async return types
- Implement typed error responses

#### 3.5 Middlewares Migration

- Add missing JWT import in `Authentication.js`
- Type all middleware functions with Express types
- Add proper error handling types

#### 3.6 Routes Migration

- Convert to TypeScript with proper Express Router typing
- Add route parameter validation

#### 3.7 Setup Files Migration

- Convert migration and seeder files to TypeScript
- Add proper database operation typing

### Phase 4: Quality Assurance

#### 4.1 Compilation Testing

- Ensure all files compile without errors
- Verify type checking passes
- Check for any missing dependencies

#### 4.2 Runtime Testing

- Test all API endpoints
- Verify database connections work
- Confirm authentication flows function
- Test file upload functionality

#### 4.3 Code Quality

- Ensure consistent import/export patterns
- Verify all async functions have proper return types
- Check error handling maintains existing behavior

## Risk Mitigation

### Low Risk Items

- Type annotations (additive only)
- Interface definitions (no runtime impact)
- Configuration files (straightforward conversion)

### Medium Risk Items

- Import/export conversion (potential module resolution issues)
- Middleware typing (Express typing complexity)

### High Risk Items

- Database query typing (MariaDB library compatibility)
- Authentication middleware (JWT verification flow)

### Mitigation Strategies

1. **Incremental Migration:** Convert one file at a time
2. **Backward Compatibility:** Keep existing functionality identical
3. **Testing:** Verify each migrated component before proceeding
4. **Rollback Plan:** Maintain original .js files until full verification

## Success Criteria

- [ ] All files successfully compile with TypeScript
- [ ] Zero runtime functionality changes
- [ ] All API endpoints respond correctly
- [ ] Database operations work as expected
- [ ] Authentication and authorization unchanged
- [ ] File upload functionality preserved
- [ ] No new runtime errors introduced

## Implementation Timeline

**Estimated Duration:** 2-3 hours

1. **Setup (30 min):** Dependencies and configuration
2. **Types (30 min):** Interface and type definitions
3. **Core Migration (90 min):** Entry point, config, models, controllers
4. **Middleware & Routes (45 min):** Authentication, routing, setup files
5. **Testing & Verification (30 min):** End-to-end functionality testing

## Next Steps

Upon approval:

1. Begin with Phase 1 (TypeScript setup)
2. Proceed systematically through each migration phase
3. Test thoroughly after each major component migration
4. Document any issues or deviations from plan
