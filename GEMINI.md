# Gemini Project Analysis: peep-nextjs

## Project Overview

This is a full-stack social media application built with Next.js, resembling a Twitter-like platform. It allows users to register, log in, post "peeps", follow other users, and receive notifications. The frontend is built with React and TypeScript, styled with TailwindCSS and DaisyUI. The backend is handled by Next.js API routes, with authentication provided by NextAuth.js and database access through Prisma ORM connected to a MongoDB database.

### Key Technologies

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** TailwindCSS, DaisyUI
*   **UI:** React
*   **State Management:** Zustand, TanStack React Query (for server state)
*   **Backend:** Next.js API Routes
*   **Authentication:** NextAuth.js (Credentials-based)
*   **Database ORM:** Prisma
*   **Database:** MongoDB
*   **Linting:** ESLint

## Building and Running

### 1. Environment Setup

Before running the application, you need to set up your environment variables. Create a `.env` file in the root of the project and add the following:

```
# Example .env file
DATABASE_URL="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
NEXTAUTH_JWT_SECRET="<your-jwt-secret>"
NEXTAUTH_SECRET="<your-nextauth-secret>"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Prisma setup

Update the prisma schema with the correct database connection string and then run the following command to generate the Prisma client:

```bash
npx prisma generate
```

To push the schema changes to the database, run:

```bash
npx prisma db push
```

### 4. Running the Development Server

To start the application in development mode:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Key Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production-ready build.
*   `npm run start`: Starts the production server (requires a prior `build`).
*   `npm run lint`: Lints the codebase using ESLint.

## Development Conventions

### Architecture

The project follows a feature-driven structure within the Next.js App Router paradigm.

*   **/app**: Contains the application's pages, layouts, and API routes.
    *   **/app/api**: Houses all backend API endpoints.
*   **/components**: Contains reusable React components.
    *   **/components/layout**: Components related to the main application layout (Sidebar, FollowBar).
    *   **/components/modals**: Modal dialog components for login, registration, and editing.
    *   **/components/users**: Components related to user profiles.
*   **/hooks**: Custom React hooks for managing UI state and data fetching. For example, `useCurrentUser` fetches the logged-in user's data, and `useLoginModal` controls the visibility of the login modal.
*   **/libs**: Core library files and helper functions. `prisma.ts` initializes the Prisma client, and `serverAuth.ts` provides server-side authentication utilities.
*   **/prisma**: Contains the `schema.prisma` file, which defines the database schema.

### Styling

The project uses TailwindCSS for utility-first styling, complemented by the DaisyUI component library for pre-built components and theming. The dark theme is enabled by default in the root layout (`app/layout.tsx`).

### State Management

*   **Client-side UI State:** Zustand is used for managing global UI state, such as the open/closed status of modals.
*   **Server State & Data Fetching:** TanStack React Query (`@tanstack/react-query`) is used for fetching, caching, and managing server state. The `useCurrentUser` hook is a prime example of its usage.

### Authentication

Authentication is handled by NextAuth.js using a credentials-based provider (email and password). The authentication logic and NextAuth configuration are located in `app/api/auth/[...nextauth]/route.ts`. Session management is configured to use JSON Web Tokens (JWT).
