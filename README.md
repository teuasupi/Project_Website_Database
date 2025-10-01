# IKA TEUAS UPI - Alumni Association Website

> **Ikatan Keluarga Alumni Teknik Elektro UPI** - Connecting electrical engineering alumni from Universitas Pendidikan Indonesia

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The IKA TEUAS UPI website is a comprehensive digital platform designed to strengthen the alumni network of the Electrical Engineering department at Universitas Pendidikan Indonesia (UPI). This platform serves as a centralized hub for communication, resource sharing, and community engagement among alumni, current students, and faculty.

### Mission
To create an integrated and accessible digital home for the TEUAS community, facilitating professional collaboration, knowledge sharing, and ongoing value for all members.

### Target Audience
- **Alumni**: New graduates and senior professionals seeking networking and opportunities
- **Students**: Current Teknik Elektro UPI students looking for mentorship and career guidance
- **Faculty**: Staff seeking collaboration with alumni on academic and research initiatives

## ✨ Features

### Core Platform
- 🏠 **Homepage** - Landing page with announcements and highlights
- ℹ️ **About TEUAS** - Department background, vision, and mission
- 📰 **News & Events** - Latest announcements and upcoming activities
- 📸 **Media Gallery** - Photo and video documentation
- 📞 **Contact & Services** - Alumni services and support information

### Alumni Engagement
- 👥 **Alumni Directory** - Searchable member database with profiles
- 📝 **Member Registration** - Simple registration process for new alumni
- ✍️ **Alumni Blog** - Platform for educational and inspirational articles
- 💬 **Discussion Forum** - Community discussion space

### Programs & Initiatives
- 🎓 **Scholarship Portal** - Information on scholarships and endowment fund
- 💼 **Job Board** - Career opportunities and professional networking
- 🤝 **Mentorship Program** - Connect mentors with mentees

### Technical Features
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🔐 **Admin Dashboard** - Content and user management interface
- 🔒 **Security** - Protection against common web vulnerabilities
- 🚀 **Performance** - Optimized loading and user experience

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **State Management**: React hooks & context
- **Authentication**: NextAuth.js

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (migrated from JavaScript)
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer
- **Email**: Nodemailer
- **API**: RESTful architecture

### Development Tools
- **Monorepo**: Turborepo
- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript compiler
- **Development**: Nodemon for backend, Next.js dev for frontend

## 📁 Project Structure

```
teuas-website/
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Database and app configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middlewares/       # Authentication, validation, etc.
│   │   ├── models/           # Data models
│   │   ├── routes/           # API route definitions
│   │   ├── setup/            # Database migration and seeding
│   │   └── types/            # TypeScript type definitions
│   ├── dist/                 # Compiled JavaScript output
│   └── package.json
│
├── frontend/                  # Next.js web application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── (auth)/       # Authentication pages
│   │   │   ├── (dashboard)/  # Admin dashboard
│   │   │   ├── api/          # API routes
│   │   │   └── ...          # Feature pages
│   │   ├── components/       # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── features/     # Feature-specific components
│   │   │   ├── layout/       # Layout components
│   │   │   └── common/       # Shared components
│   │   ├── lib/              # Utilities and configurations
│   │   │   ├── api/          # API client
│   │   │   ├── auth/         # Authentication setup
│   │   │   ├── constants/    # App constants
│   │   │   └── validations/  # Form validations
│   │   └── types/            # TypeScript types
│   ├── public/               # Static assets
│   └── package.json
│
├── shared/                    # Shared utilities and types
│   ├── src/
│   │   ├── constants/        # Shared constants
│   │   ├── types/            # Shared TypeScript types
│   │   └── utils/            # Shared utility functions
│   └── package.json
│
├── plans/                     # Development planning documents
├── CLAUDE.md                  # AI assistant guidelines
├── PRD.md                     # Product Requirements Document
├── turbo.json                 # Turborepo configuration
└── package.json               # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 10.x or higher
- **MariaDB** or **MySQL** database server

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd teuas-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in the backend directory:
   ```bash
   # backend/.env
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=TEUAS
   DB_PORT=3306
   JWT_SECRET=your-jwt-secret
   ```

   Create `.env.local` in the frontend directory:
   ```bash
   # frontend/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Set up the database**
   ```bash
   # Create MariaDB database
   mysql -u root -p
   CREATE DATABASE TEUAS;
   ```

5. **Run database migrations** (if available)
   ```bash
   cd backend
   npm run migrate
   ```

## 🔧 Development

### Start Development Servers

**Start all services:**
```bash
npm run dev
```

**Start individual services:**
```bash
# Frontend only (http://localhost:3000)
npm run frontend

# Backend only (http://localhost:3001)
npm run backend

# Shared package only
npm run shared
```

### Available Scripts

**Root level:**
- `npm run dev` - Start all development servers
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages
- `npm run format` - Format code with Prettier
- `npm run clean` - Clean build artifacts

**Backend specific:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run type-check` - TypeScript type checking

**Frontend specific:**
- `npm run dev` - Start Next.js development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run type-check` - TypeScript type checking

### Code Quality

This project enforces code quality through:

- **ESLint** - Code linting and style enforcement
- **Prettier** - Consistent code formatting
- **TypeScript** - Type safety and better developer experience
- **Husky** - Git hooks for pre-commit checks (if configured)

Format code before committing:
```bash
npm run format
npm run lint
```

## 🏗 Architecture

### Backend Architecture
- **RESTful API** design with Express.js
- **MVC pattern** with controllers, models, and routes
- **Middleware-based** authentication and authorization
- **Type-safe** with TypeScript throughout
- **Database abstraction** for easy migration between SQL databases

### Frontend Architecture
- **Component-based** architecture with React
- **App Router** for file-based routing (Next.js 13+)
- **Server-side rendering** and static generation where appropriate
- **Type-safe API** integration with TypeScript
- **Responsive design** with Tailwind CSS

### Database Schema
The application uses MariaDB with the following main entities:
- Users (Alumni, Students, Faculty)
- Articles and Blog Posts
- Events and News
- Media and Gallery
- Scholarships and Applications

## 🚀 Deployment

### Production Build

1. **Build all packages:**
   ```bash
   npm run build
   ```

2. **Start production servers:**
   ```bash
   # Backend
   cd backend && npm run start
   
   # Frontend
   cd frontend && npm run start
   ```

### Environment Configuration

Ensure production environment variables are properly configured:

- Database connection settings
- JWT secrets and API keys
- CORS settings
- File upload configurations
- Email service credentials

### Recommended Deployment Platforms

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, DigitalOcean, AWS, or any Node.js hosting
- **Database**: Managed MariaDB/MySQL service

## 📈 Development Roadmap

### Current Phase (July-August 2025)
- ✅ Project setup and architecture
- ✅ Backend TypeScript migration
- ✅ Frontend component development
- 🔄 Core feature implementation
- 🔄 Authentication system
- 🔄 Admin dashboard

### Next Phase (September 2025)
- 🔄 Integration testing
- 🔄 Security testing
- 🔄 Performance optimization
- 🔄 Deployment preparation

### Launch Phase (October 2025)
- 🔄 Production deployment
- 🔄 User acceptance testing
- 🔄 Official launch
- 🔄 Post-launch monitoring

## 🤝 Contributing

We welcome contributions from the community! Please read our contributing guidelines:

### Development Guidelines

1. **Code Style**: Follow the existing TypeScript/JavaScript patterns
2. **Components**: Use existing UI components from shadcn/ui
3. **Testing**: Write tests for new features
4. **Documentation**: Update documentation for significant changes

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint && npm run type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📞 Support & Contact

- **Email**: info@ikateuas.com
- **Phone**: +62 22 2013163
- **Address**: Jl. Dr. Setiabudhi No. 229, Bandung 40154, Indonesia

### Development Team

For technical questions or contributions, please refer to the development documentation in `/plans/` directory.

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

---

**Built with ❤️ for the IKA TEUAS UPI community**

*Connecting alumni, empowering futures, building the electrical engineering community of tomorrow.*