# Gemini Project Context: NestJS Payment Backend

This document provides a comprehensive overview of the NestJS payment backend project to be used as a context for AI-assisted development.

## Project Overview

This is a backend service for a subscription-based payment system, built with the **NestJS framework** on **Node.js** and written in **TypeScript**.

The core functionality revolves around managing user subscriptions to different service plans. It is architected to handle payments from multiple providers and maintain a record of transactions and subscription statuses.

### Key Technologies & Architecture

-   **Framework**: [NestJS](https://nestjs.com/) (a progressive Node.js framework).
-   **Database**: **PostgreSQL**, managed via **Docker Compose** for local development.
-   **ORM**: **Prisma** is used for database access and schema management. The schema is defined declaratively in `prisma/schema.prisma`.
-   **Authentication**: Implemented using **JWTs** (JSON Web Tokens) with Passport.js.
-   **Payment Providers**: The system is integrated with:
    -   **Stripe**
    -   **YooKassa**
    -   **CryptoPay** (as indicated by `CRYPTOPAY` in the schema)
-   **Background Jobs**: **BullMQ** with **Redis** is used for handling asynchronous tasks and background jobs.
-   **Email Notifications**: Uses `@nestjs-modules/mailer` for sending emails, with templates likely built using `react-email`.
-   **Configuration**: The application is configured using environment variables and NestJS's `ConfigModule`.
-   **API Documentation**: **Swagger** (`@nestjs/swagger`) is set up for API documentation.

### Data Model (`prisma/schema.prisma`)

The database schema defines the core entities:

-   `User`: Represents a user account, with fields for authentication and a link to their subscription and Stripe customer ID.
-   `Plan`: Defines the different subscription plans available, including pricing details and Stripe price IDs.
-   `UserSubscription`: A linking table that manages a user's subscription to a specific plan, tracking its status (`ACTIVE`, `EXPIRED`, etc.) and duration.
-   `Transaction`: Records every payment attempt, detailing the amount, provider, status, and associated user/subscription.

## Building and Running the Project

The project uses `yarn` as the package manager. Key commands are defined in `package.json`.

### Local Development

1.  **Start dependent services** (PostgreSQL and Redis):
    ```bash
    docker-compose up -d
    ```

2.  **Install dependencies**:
    ```bash
    yarn install
    ```

3.  **Seed the database** (optional, for initial data):
    ```bash
    yarn run db:seed
    ```

4.  **Run the application in watch mode**:
    ```bash
    yarn run start:dev
    ```
    The server will be available at `http://localhost:3000` (or as configured).

### Building for Production

```bash
# Create a production-ready build
yarn run build

# Run the production build
yarn run start:prod
```

### Running Tests

```bash
# Run unit tests
yarn run test

# Run end-to-end (e2e) tests
yarn run test:e2e

# Generate a test coverage report
yarn run test:cov
```

## Development Conventions

-   **Modularity**: The code is organized into modules following NestJS conventions (e.g., `AuthModule`, `PaymentModule`, `UsersModule`). Each module encapsulates a specific domain.
-   **Code Style**: Code formatting is enforced by **Prettier** and linting by **ESLint**. Run `yarn run format` and `yarn run lint` to maintain consistency.
-   **Database Migrations**: While not explicitly defined in scripts, Prisma's `migrate` commands should be used to apply schema changes.
-   **Environment Variables**: A `.env` file is required for local development to store secrets and configuration (e.g., database URLs, API keys).
