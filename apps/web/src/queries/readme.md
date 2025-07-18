# Queries Folder

This folder contains the data fetching logic and state management for API interactions throughout the application. It uses TanStack Query (React Query) to manage server state, caching, background updates, and optimistic UI updates.

## Purpose

The queries folder organizes:

1. API data fetching hooks organized by domain
2. Mutation hooks for creating, updating, and deleting data
3. Type definitions for query parameters and responses
4. Query key definitions for cache management
5. Custom query utilities and extensions

## Folder Structure

```
queries/
├── client.ts                          # Query client configuration
├── dashboard/
│   └── dashboard.ts                   # Dashboard query and mutation hooks
├── dashboard-category/
│   └── dashboard-category.ts          # Dashboard category queries
├── dashboard-profile/
│   └── dashboard-profile.ts           # User dashboard profile queries
├── user/
│   └── user.ts                        # User related queries
├── widget/
│   └── widget.ts                      # Widget related queries
└── ... (other query domains)
```

## Query Client Configuration

The `client.ts` file sets up and configures the TanStack Query client:

```tsx
// client.ts
import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: true,
      },
    },
  });
}
```

## Domain-Specific Query Hooks

Each domain folder contains query hooks specific to that domain. For example, the dashboard queries:

### Query Hooks (GET operations)

These hooks fetch data from the API:

```tsx
// dashboard.ts - Query Hooks

import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useQuery } from "@tanstack/react-query";

// Get dashboard by ID
export type UseGetDashboardParams = Parameters<
  typeof api.functional.dashboard.get
>[1];
export type UseGetDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.get>
>;

export function useGetDashboardQuery(
  params: UseGetDashboardParams,
  initialData?: UseGetDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => {
      return api.functional.dashboard.get(connection, params);
    },
    initialData: () => initialData,
    enabled: !!params.id,
  });
}

// List dashboards
export type UseListDashboardParams = Parameters<
  typeof api.functional.dashboard.list.list
>[1];
export type UseListDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.list.list>
>;

export function useListDashboardQuery(
  params: UseListDashboardParams,
  initialData?: UseListDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => {
      return api.functional.dashboard.list.list(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}
```

### Mutation Hooks (POST, PUT, DELETE operations)

These hooks modify data on the API:

```tsx
// dashboard.ts - Mutation Hooks

import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

// Create dashboard
export type UseCreateDashboardPayload = Parameters<
  typeof api.functional.dashboard.create
>[1];
export type UseCreateDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.create>
>;

export function useCreateDashboardMutation() {
  const router = useRouter();
  const connection = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UseCreateDashboardPayload) => {
      return api.functional.dashboard.create(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
      router.push(`/dashboard/manage`);
    },
  });
}

// Update dashboard
export type UseUpdateDashboardPayload = Parameters<
  typeof api.functional.dashboard.update
>[1];
export type UseUpdateDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.update>
>;

export function useUpdateDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UseUpdateDashboardPayload) => {
      return api.functional.dashboard.update(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
    },
  });
}

// Delete dashboard
export type UseDeleteDashboardParams = Parameters<
  typeof api.functional.dashboard.$delete
>[1];
export type UseDeleteDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.$delete>
>;

export function useRemoveDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UseDeleteDashboardParams) => {
      return api.functional.dashboard.$delete(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
    },
  });
}
```

## Usage in Components

```tsx
import {
  useGetDashboardQuery,
  useUpdateDashboardMutation,
} from "@/queries/dashboard/dashboard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function DashboardEditor({ dashboardId }) {
  const {
    data: dashboard,
    isLoading,
    error,
  } = useGetDashboardQuery({ id: dashboardId });
  const { mutate: updateDashboard, isPending } = useUpdateDashboardMutation();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading dashboard: {error.message}</div>;
  if (!dashboard) return <div>Dashboard not found</div>;

  function handleSave(updatedData) {
    updateDashboard({
      id: dashboardId,
      ...updatedData,
    });
  }

  return (
    <div>
      <h1>{dashboard.name}</h1>
      {/* Dashboard editing form */}
      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
```

## Query Key Management

Query keys are used for cache management and should follow a consistent pattern:

- Single entity: `[entity, id]` (e.g., `["dashboards", "123"]`)
- Collection: `[entity, params]` (e.g., `["dashboards", { page: 1, limit: 10 }]`)
- Nested resource: `[parentEntity, parentId, childEntity]` (e.g., `["dashboards", "123", "widgets"]`)

## Type Safety

All query and mutation hooks are fully typed using TypeScript:

1. Parameter types derived from the SDK
2. Return data types derived from the SDK
3. Type inference for form data and API interactions

## Best Practices

1. **Consistent Naming**:

   - Query hooks: `use[Entity][Operation]Query` (e.g., `useGetDashboardQuery`)
   - Mutation hooks: `use[Entity][Operation]Mutation` (e.g., `useCreateDashboardMutation`)

2. **Cache Invalidation**: Always invalidate related queries when data changes

3. **Loading and Error States**: Provide proper handling for all states

4. **Optimistic Updates**: Implement optimistic updates for better UX

5. **Initial Data**: Support passing initial data for server-side rendering

6. **Type Safety**: Maintain complete type safety between frontend and API

7. **Query Keys**: Follow consistent query key patterns

8. **Query Reuse**: Create reusable query hooks for common patterns

9.
