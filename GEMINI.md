# GEMINI.md

## Project Overview

This is a full-stack web application for handling payments. The project is a monorepo containing a `backend` and a `frontend`.

- **Backend:** A NestJS application that provides a REST API for handling user authentication, payment processing, and subscription plans. It uses Prisma as an ORM for database interactions and integrates with Stripe and YooMoney for payment processing.

- **Frontend:** A Next.js application that provides the user interface for the application. It includes features for user registration and payment forms.

## Backend (NestJS)

The backend is a NestJS application located in the `/backend` directory.

### Building and Running

1.  **Install dependencies:**
    ```bash
    cd backend
    yarn install
    ```

2.  **Run the development server:**
    ```bash
    yarn run start:dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    yarn run build
    ```

### Testing

-   **Run unit tests:**
    ```bash
    yarn run test
    ```

-   **Run end-to-end tests:**
    ```bash
    yarn run test:e2e
    ```

### Database

The project uses Prisma for database management.

-   **Database Schema:** The schema is defined in `backend/prisma/schema.prisma`.
-   **Seeding:** To seed the database, run:
    ```bash
    yarn db:seed
    ```

## Frontend (Next.js)

The frontend is a Next.js application located in the `/frontend` directory.

### Building and Running

1.  **Install dependencies:**
    ```bash
    cd frontend
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Development Conventions

-   **Code Style:** The project uses Prettier for code formatting.
-   **Linting:** The backend uses ESLint for linting TypeScript code.
