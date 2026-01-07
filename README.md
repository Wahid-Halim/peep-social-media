# Peep: A Next.js Social Media Platform

![Peep Logo](https://i.imgur.com/example.png) <!-- Placeholder: Replace with a real logo if available -->

## Executive Summary

Peep is a full-stack social media application built with Next.js, designed as a modern, feature-rich Twitter-like platform. It allows users to register, log in, post "peeps" (short messages), follow other users, and receive notifications. This project serves as a comprehensive example of how to integrate a modern web stack, including Next.js with the App Router, Prisma for database management, and NextAuth.js for secure authentication, to build a scalable and maintainable web application.

The primary goal of Peep is to provide a practical, real-world codebase for developers looking to learn and implement these technologies. It showcases best practices for structuring a full-stack Next.js application, handling server-side logic with API Routes, managing data with an ORM, and securing an application with credentials-based authentication.

## Architecture Overview

The application follows a monolithic architecture where the frontend and backend are tightly coupled within the Next.js framework. This simplifies development and deployment while leveraging the full power of Next.js for both client-side rendering and server-side API logic.

### High-Level Diagram

```
+--------------------------+        +------------------------+        +----------------------+
|   Client (Next.js/React) |        | API Routes (Next.js)   |        |      MongoDB         |
| - UI Components          | <-----> | - Auth (NextAuth.js)   | <-----> | - User Data          |
| - React Query Hooks      |        | - Data Logic           |        | - Post Data          |
| - Zustand State          |        +------------------------+        | - Notification Data  |
+--------------------------+                 |                        +----------------------+
                                             |
                                     +-------+-------+
                                     | Prisma ORM    |
                                     +---------------+
```

### Modules & Components

-   **/app**: Core of the application using the Next.js App Router.
    -   **/app/(pages)**: Contains the main pages of the application (e.g., home feed, user profiles, notifications).
    -   **/app/api**: Houses all backend API endpoints, organized by feature (e.g., `auth`, `posts`, `users`).
-   **/components**: Contains reusable React components.
    -   **/components/layout**: Components for the main application layout (e.g., `Sidebar`, `FollowBar`).
    -   **/components/modals**: Modal dialogs for Login, Registration, and Editing profiles.
    -   **/components/posts**: Components related to displaying and interacting with posts ("peeps").
-   **/hooks**: Custom React hooks for managing state and data fetching.
    -   `useCurrentUser`, `useUsers`, `usePosts`: Data fetching hooks using `@tanstack/react-query`.
    -   `useLoginModal`, `useRegisterModal`: UI state management hooks using `zustand`.
-   **/libs**: Core library initializations and helper functions.
    -   `prisma.ts`: Initializes the Prisma client for database access.
    -   `serverAuth.ts`: A server-side utility for authenticating requests in API routes.

## Setup Guide

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or a compatible package manager
-   A MongoDB database instance (e.g., from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/peep-nextjs.git
    cd peep-nextjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Create an environment file:**
    Create a `.env` file in the root of the project by copying the example:
    ```bash
    cp .env.example .env
    ```
    *Note: If `.env.example` does not exist, create a `.env` file manually.*

2.  **Set environment variables:**
    Open the `.env` file and add the required environment variables. See the [Configuration](#configuration) section for more details.

### Running the Application

1.  **Generate Prisma Client:**
    This command reads your `prisma/schema.prisma` file and generates the TypeScript types for the Prisma Client.
    ```bash
    npx prisma generate
    ```

2.  **Push database schema:**
    This command syncs your Prisma schema with your MongoDB database, creating the necessary collections.
    ```bash
    npx prisma db push
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Usage Guide

Peep is a social media platform with the following core features:

-   **Authentication**: Users can register for a new account and log in with their email and password.
-   **Post Peeps**: Once logged in, users can post short messages (peeps) from the home feed.
-   **Home Feed**: The home feed displays peeps from all users in reverse chronological order.
-   **User Profiles**: Each user has a public profile page that displays their bio and peeps.
-   **Follow System**: Users can follow and unfollow other users.
-   **Notifications**: Users receive notifications when another user likes their peep or follows them.

### API Endpoints

The backend is exposed via RESTful API endpoints located in `/app/api`.

| Method | Endpoint                    | Description                                  |
| :----- | :-------------------------- | :------------------------------------------- |
| `POST` | `/api/register`             | Creates a new user account.                  |
| `GET`  | `/api/posts`                | Fetches all posts (for the home feed).       |
| `GET`  | `/api/posts?userId=[id]`    | Fetches posts for a specific user.           |
| `POST` | `/api/posts`                | Creates a new post.                          |
| `POST` | `/api/follow`               | Follows or unfollows a user.                 |
| `GET`  | `/api/users/[userId]`       | Fetches a specific user's profile data.      |
| `PATCH`| `/api/edit`                 | Updates the current user's profile.          |
| `GET`  | `/api/notifications/[userId]`| Fetches notifications for a user.            |

## Configuration

All configuration is handled through environment variables.

| Variable              | Description                                                                                             | Example                                  |
| :-------------------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| `DATABASE_URL`        | The connection string for your MongoDB database.                                                        | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `NEXTAUTH_JWT_SECRET` | A secret key used to sign the JSON Web Tokens (JWTs) for NextAuth.js. Generate a strong, random string.  | `super-secret-jwt-key`                   |
| `NEXTAUTH_SECRET`     | A secret key used for session encryption in NextAuth.js. Generate a strong, random string.                | `super-secret-nextauth-key`              |

**Secrets Handling:** Never commit the `.env` file to version control. Use your hosting provider's secrets management system to set these environment variables in production.

## Testing

Currently, this project does not have an automated testing framework configured.

### Recommended Test Strategy

-   **Unit Tests**: For utility functions and custom hooks. [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) would be a good fit.
-   **Integration Tests**: For API routes to ensure they interact with the database correctly.
-   **End-to-End (E2E) Tests**: For critical user flows like login, posting, and following. [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) are recommended.

## Deployment

The application is designed to be deployed on platforms that support Node.js and Next.js, such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Vercel (Recommended)

1.  Push your code to a GitHub/GitLab/Bitbucket repository.
2.  Import the repository into Vercel.
3.  Vercel will automatically detect that it is a Next.js project and configure the build settings.
4.  Add your `DATABASE_URL`, `NEXTAUTH_JWT_SECRET`, and `NEXTAUTH_SECRET` as environment variables in the Vercel project settings.
5.  Deploy. Vercel will automatically run `npm run build`.

### CI/CD Notes

A typical CI/CD pipeline for this project would include the following steps:
1.  On pull request: Run `npm run lint`.
2.  On merge to `main`: Run `npm run lint`, then run `npm run build`. If the build is successful, deploy to production.

## Contributing

We welcome contributions from the community! Please follow these guidelines.

1.  **Branching**: Create a new branch for each feature or fix.
    -   `feature/your-feature-name`
    -   `fix/your-bug-fix`
2.  **Linting**: Before committing, run the linter to ensure your code adheres to the project's style.
    ```bash
    npm run lint
    ```
3.  **Pull Requests (PRs)**:
    -   Open a PR against the `main` branch.
    -   Provide a clear title and description of your changes.
    -   Explain the "what" and "why" of your contribution.

## FAQ & Troubleshooting

-   **Error: Prisma Client could not be found.**
    -   **Fix**: Run `npx prisma generate` to generate the client.
-   **Error: Authentication not working or session is null.**
    -   **Fix**: Ensure `NEXTAUTH_JWT_SECRET` and `NEXTAUTH_SECRET` are set correctly in your `.env` file.
-   **Error: Cannot connect to database.**
    -   **Fix**: Verify that your `DATABASE_URL` is correct and that your IP address is whitelisted in your MongoDB Atlas settings.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

*This documentation was generated to provide a comprehensive overview for developers. If you find any issues or have suggestions for improvement, please open an issue or pull request.*