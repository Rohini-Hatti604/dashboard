# Clean Start Dashboard - Web Application

A modern, feature-rich dashboard frontend built with Next.js and React, designed to provide an intuitive and responsive user interface for data visualization and management.

## Overview

This web application is part of the Clean Start Dashboard monorepo project, serving as the frontend interface for viewing and managing images, dashboards, widgets, user settings.

## Features

- **Dashboard Management**: Create, edit, clone, and delete dashboards
- **Widget Library**: Add and configure various visualization widgets
- **Dashboard Categories**: Organize dashboards into categories
- **User Preferences**: Save favorite dashboards and default views
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **UI Component Library**: Custom components built with Radix UI primitives
- **Styling**: Tailwind CSS with shadcn/ui
- **State Management**:
  - Server state: TanStack Query (React Query)
  - Client state: React Context
- **Form Management**: React Hook Form with Zod validation
- **Data Fetching**: Custom SDK generated from the API using Nestia
- **Fonts**: Geist font family

## Project Structure

```
web/
├── public/            # Static assets
├── src/
│   ├── api/           # API client configuration
│   ├── components/    # React components
│   │   ├── forms/     # Form components with validation
│   │   ├── inputs/    # Reusable input components
│   │   ├── layouts/   # Page layout components
│   │   ├── placeholders/ # Loading, empty, and error states
│   │   ├── providers/ # Context providers
│   │   ├── sections/  # Domain-specific section components
│   │   ├── tables/    # Table components and column definitions
│   │   └── ui/        # Base UI components
│   ├── context/       # React context definitions
│   ├── env/           # Environment configuration
│   ├── lib/           # Utility libraries
│   ├── pages/         # Next.js pages
│   ├── queries/       # TanStack Query hooks for data fetching
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
```

## Component Architecture

The application follows a hierarchical component architecture:

1. **UI Components**: Base UI components that form the design system
2. **Form/Input Components**: Specialized input components with validation
3. **Table Components**: Data display components with sorting and filtering
4. **Section Components**: Domain-specific components for different features
5. **Layout Components**: Page structure and navigation elements
6. **Page Components**: Route-based components that compose the above

## Data Fetching

The application uses TanStack Query for data fetching and state management:

- **API Client**: Configured to handle authentication and requests
- **Query Hooks**: Domain-specific hooks for fetching data
- **Mutation Hooks**: Hooks for creating, updating, and deleting data
- **Type Safety**: Full TypeScript integration with API SDK

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp example.env .env.local
# Configure your environment variables
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the application

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

### Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_API_URL`: URL of the backend API
- `NEXT_PUBLIC_APP_URL`: URL of the frontend application

See `example.env` for all required variables.

## Design System

The application implements a consistent design system with:

- Typography scales
- Color palette
- Spacing system
- Component variants
- Responsive breakpoints

## Accessibility

The application aims for WCAG 2.1 AA compliance with:

- Semantic HTML
- Keyboard navigation
- Screen reader support
- Focus management
- Sufficient color contrast

## Performance Optimization

The application implements various optimizations:

- Code splitting
- Image optimization
- Font optimization
- Data prefetching
- Memoization where appropriate
