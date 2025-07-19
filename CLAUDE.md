# Project Guide: IKA TEUAS UPI Website

**Version:** 1.0
**Date:** July 19, 2025

## 1. Overview

This document provides the necessary context, conventions, and workflow for developing the IKA TEUAS UPI alumni platform. Its purpose is to guide an AI development assistant (e.g., Gemini) in contributing to the codebase effectively and consistently.

The project's goal is to build a comprehensive website and database to serve as a community hub for the alumni, students, and faculty of the Teknik Elektro UPI program.

For a detailed breakdown of features and product requirements, refer to **[PRD.md](PRD.md)**.
For the project schedule, refer to **[Weekly_Progress - Estimasi Timeline dan Checklist.csv](Weekly_Progress%20-%20Estimasi%20Timeline%20dan%20Checklist.csv)**.

## 2. Core Mandates for AI Contribution

As an AI assistant, you must adhere to the following principles:

1.  **Primary Directive: Migrate to TypeScript.** The user strongly prefers TypeScript over JavaScript. Your primary technical goal is the systematic migration of the entire backend from JavaScript to TypeScript. All new backend code **must** be written in TypeScript.
2.  **Adhere to Existing Conventions.** Before writing any code, analyze the existing project structure, coding style, and architectural patterns. New code should blend in seamlessly.
3.  **Verify, Don't Assume.** Never assume a library or framework is available. Always check `package.json` before introducing or using a dependency.
4.  **Incremental and Verifiable Changes.** Implement features and refactors in small, logical steps. Each step should result in a testable and verifiable state.
5.  **Test-Driven Mindset.** All new features, bug fixes, or refactors must be accompanied by corresponding tests.
6.  **Clarity and Communication.** If a request is ambiguous or requires a significant architectural decision, present a clear plan or ask clarifying questions before proceeding.

## 3. Technology Stack

### Backend
*   **Language:** TypeScript (migrating from JavaScript)
*   **Framework:** Node.js with Express.js
*   **Database:** To be determined. All database interaction logic should be abstracted into a dedicated service layer to accommodate any SQL or NoSQL database.
*   **Package Manager:** npm

### Frontend
*   **Language:** TypeScript
*   **Framework:** Next.js
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui

## 4. Project Structure

The repository is a monorepo with separate `backend` and `frontend` directories.

```
.
├── backend/
│   ├── dist/         # Compiled JavaScript output
│   ├── src/          # TypeScript source code
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   ├── node_modules/
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/                # Next.js App Router
│   │   ├── components/     # UI Components (including shadcn/ui)
│   │   ├── lib/            # Utility functions (e.g., shadcn utils)
│   │   ├── layout.tsx      # Main app layout
│   │   └── page.tsx        # Main page
│   ├── public/             # Static assets
│   ├── node_modules/
│   ├── package.json
│   └── ...
├── .gitignore
├── GUIDE.md        # This file
└── PRD.md
```

## 5. Development Workflow

### Setup
1.  **Backend:** Navigate to the `backend` directory and run `npm install`.
2.  **Frontend:** The frontend should be initialized using the Next.js CLI. The command to run from the project root is:
    ```bash
    npx create-next-app@latest frontend
    ```
    During setup, select **TypeScript**, **Tailwind CSS**, and the **App Router**. After creation, `shadcn/ui` should be initialized within the `frontend` directory by following its official documentation.

### Backend
*   **Run in development mode (with auto-reloading):**
    ```bash
    # From the 'backend' directory
    npm run dev
    ```
*   **Compile TypeScript to JavaScript:**
    ```bash
    # From the 'backend' directory
    npm run build
    ```
*   **Run compiled code (for production simulation):**
    ```bash
    # From the 'backend' directory
    npm run start
    ```

### Frontend
*   **Run development server:**
    ```bash
    # From the 'frontend' directory
    npm run dev
    ```
*   **Build for production:**
    ```bash
    # From the 'frontend' directory
    npm run build
    ```
*   **Start production server:**
    ```bash
    # From the 'frontend' directory
    npm run start
    ```

## 6. Coding Style and Conventions

*   **Formatting:** The project will use **Prettier** for automated code formatting. A `.prettierrc` file should be created.
*   **Linting:** The project will use **ESLint** with plugins for TypeScript and React. A `.eslintrc.js` file should be created.
*   **Naming:**
    *   Use `PascalCase` for components, classes, and type/interface names (e.g., `UserProfile`, `class UserService`).
    *   Use `camelCase` for variables and functions (e.g., `const userId`, `function getUser()`).
*   **API Design:** The backend API should follow RESTful principles. Use clear, noun-based endpoints (e.g., `/api/users`, `/api/posts/:id`).

## 7. Roadmap & Current Focus

The current development phase (July 2025) is focused on:
1.  **Backend Development:** Implementing the core features as defined in the PRD.
2.  **TypeScript Migration:** Actively refactoring the existing JavaScript backend to be fully TypeScript.