# Clean Start Dashboard - API

A powerful NestJS-based backend service providing API endpoints for dashboard management, including dashboard categories, widgets, user profiles, authentication, and more.

## Overview

This API application is part of the Clean Start Dashboard monorepo project. It provides a comprehensive set of RESTful endpoints to support dashboard management functionality. It's built with NestJS, integrated with MongoDB through Prisma, and includes features like caching, OpenSearch integration, and SDK generation.

## Key Features

- **Dashboard Management**: Create, read, update, delete and clone dashboards
- **Dashboard Categories**: Organize dashboards into categories
- **Widget Management**: Create and configure various visualization widgets
- **User Profiles**: Manage user-specific dashboard preferences
- **Authentication**: Secure API endpoints with authentication
- **Authorization**: Role-based access control
- **Caching**: Redis-based caching for improved performance
- **SDK Generation**: Automatic TypeScript SDK generation with Nestia
- **API Documentation**: Swagger UI for API exploration and testing
- **OpenSearch Integration**: Advanced search capabilities

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MongoDB
- **Caching**: Redis via `cache-manager-redis-yet`
- **API Documentation**: Swagger UI via Nestia
- **SDK Generation**: Nestia
- **Search**: OpenSearch
- **Authentication**: Custom JWT implementation
- **Validation**: TypeScript with typia
- **Environment**: Node.js

## Project Structure

```
api/
├── documentation/     # Generated API documentation
├── src/
│   ├── app.module.ts  # Main application module
│   ├── main.ts        # Application entry point
│   ├── auth/          # Authentication module
│   ├── dashboard/     # Dashboard management
│   ├── dashboard-category/ # Dashboard category management
│   ├── dashboard-profile/  # User dashboard preferences
│   ├── widget/        # Widget management
│   ├── user-variable/ # User-specific variables
│   ├── role/          # Authorization roles
│   ├── open-search/   # OpenSearch integration
│   ├── image/         # Image management
│   ├── grpc/          # gRPC integration
│   └── caching/       # Caching strategies
├── test/              # End-to-end testing
├── Dockerfile         # Production Docker configuration
└── nestia.config.ts   # SDK generation configuration
```

## Core Modules

- **Dashboard Module**: Manages dashboard creation, retrieval, updating, and deletion
- **Dashboard Category Module**: Organizes dashboards into categories
- **Dashboard Profile Module**: Manages user-specific dashboard settings and preferences
- **Widget Module**: Manages visualization widgets for dashboards
- **Auth Module**: Handles authentication and security
- **Role Module**: Manages authorization and user permissions
- **OpenSearch Module**: Provides advanced search capabilities
- **Caching Module**: Implements caching strategies
- **Image Module**: Manages image uploads and storage
- **User Variable Module**: Handles user-specific variables for dashboards

## API Endpoints

The API uses a versioned URL structure with `/api/v1` prefix. Main endpoint groups include:

- `/api/v1/auth` - Authentication endpoints
- `/api/v1/dashboard` - Dashboard management
- `/api/v1/dashboard-category` - Dashboard category organization
- `/api/v1/dashboard-profile` - User dashboard preferences
- `/api/v1/widget` - Widget configuration
- `/api/v1/user-variable` - User-specific variables
- `/api/v1/role` - Authorization roles
- `/api/v1/image` - Image management

## SDK Generation

The API automatically generates a TypeScript SDK using Nestia, which allows for type-safe API consumption by the frontend. The SDK is generated in the `packages/sdk` directory of the monorepo.

```bash
# Generate SDK
npm run sdk:generate
```

## Swagger Documentation

API documentation is available through Swagger UI when the application is running:

- Swagger UI: `http://localhost:5000/swagger-api`
- Default credentials: `api-user` / `admin@123` (configurable via environment variables)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
# Copy example environment file
cp .env.example .env

# Configure variables for your environment:
# - DATABASE_URL (MongoDB connection string)
# - REDIS_HOST and REDIS_PORT (Redis connection)
# - JWT_SECRET (Authentication)
# - Other service-specific configurations
```

3. Run the development server:

```bash
npm run dev
```

4. Access the API at `http://localhost:5000/api/v1`

## Available Scripts

- `npm run build` - Build the application using NestJS CLI
- `npm run format` - Format TypeScript code with Prettier
- `npm run start` - Start the production server
- `npm run dev` - Start development server with hot reload (watch mode)
- `npm run start:debug` - Start server in debug mode with hot reload
- `npm run start:prod` - Start production server from built files
- `npm run lint` - Run ESLint and auto-fix issues
- `npm run test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:debug` - Run tests in debug mode
- `npm run test:e2e` - Run end-to-end tests
- `npm run prepare` - Install ts-patch and typia patch (runs automatically on install)
- `npm run sdk:generate` - Generate TypeScript SDK using Nestia
