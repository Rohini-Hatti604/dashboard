# Placeholders Folder

This folder contains placeholder components used throughout the application to enhance user experience during loading states, empty states, and error conditions. Placeholders provide visual feedback to users while content is being loaded or when no content is available.

## Purpose

The placeholders folder organizes components that:

1. Show loading states (skeletons, spinners, shimmers)
2. Display empty state messages and illustrations
3. Present error state feedback and recovery options
4. Maintain visual structure during asynchronous operations

## Folder Structure

```
placeholders/
├── skeletons/
│   ├── dashboard-skeleton.tsx
│   ├── table-skeleton.tsx
│   └── card-skeleton.tsx
├── empty-states/
│   ├── empty-dashboard.tsx
│   ├── no-results.tsx
│   └── empty-widget.tsx
├── error-states/
│   ├── load-error.tsx
│   ├── connection-error.tsx
│   └── permission-error.tsx
└── loaders/
    ├── spinner.tsx
    ├── progress-bar.tsx
    └── shimmer-effect.tsx
```

## Types of Placeholders

### Skeletons

Skeleton components mimic the structure of the content that will eventually load, providing a preview of the layout to reduce perceived loading time.

```tsx
export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-1/4 bg-gray-200 animate-pulse rounded-md" />
      <div className="grid grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
      </div>
    </div>
  );
}
```

### Empty States

Empty state components provide clear feedback when there's no content to display, often including illustrations and action prompts.

```tsx
export function EmptyDashboard({ onCreateNew }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-gray-400 mb-4">
        <DashboardIcon size={48} />
      </div>
      <h3 className="text-lg font-medium mb-2">No dashboards found</h3>
      <p className="text-gray-500 mb-4">
        Create your first dashboard to start visualizing your data
      </p>
      <Button onClick={onCreateNew}>Create Dashboard</Button>
    </div>
  );
}
```

### Error States

Error state components communicate when something has gone wrong and provide options for recovery.

```tsx
export function LoadError({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-red-500 mb-4">
        <AlertTriangleIcon size={48} />
      </div>
      <h3 className="text-lg font-medium mb-2">Unable to load data</h3>
      <p className="text-gray-500 mb-4">
        {message || "There was an error loading the requested content."}
      </p>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  );
}
```

### Loaders

Loader components provide visual feedback during shorter operations or when a skeleton isn't appropriate.

```tsx
export function Spinner({ size = "medium" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}
      />
    </div>
  );
}
```

## Usage Guidelines

### When to Use Placeholders

1. **Loading States**: Show skeletons or loaders when content is being fetched
2. **Empty States**: Display when a query returns no results or a container has no items
3. **Error States**: Present when an operation fails, with options to retry or recover
4. **Partial Loading**: Use when part of the UI needs to refresh independently

### Implementation Best Practices

1. **Match the Content**: Skeleton placeholders should closely match the shape and size of the content they're replacing
2. **Animation**: Use subtle animations to indicate loading is in progress
3. **Meaningful Feedback**: Empty and error states should provide clear explanations and actions
4. **Consistent Design**: Maintain consistent styling across different placeholder types
5. **Accessibility**: Ensure placeholders are accessible with proper aria attributes

## Example Component Usage

```tsx
import { DashboardSkeleton } from "@/components/placeholders/skeletons/dashboard-skeleton";
import { EmptyDashboard } from "@/components/placeholders/empty-states/empty-dashboard";
import { LoadError } from "@/components/placeholders/error-states/load-error";
import { useGetDashboardQuery } from "@/queries/dashboard/dashboard";

export function DashboardView({ id }) {
  const { data, isLoading, isError, error, refetch } = useGetDashboardQuery({ id });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) return <LoadError message={error.message} onRetry={refetch} />;

  if (!data) return <EmptyDashboard onCreateNew={handleCreateNew} />;

  return (
    // Actual dashboard content
  );
}
```

## Design Considerations

1. **Brand Alignment**: Placeholders should reflect your brand's visual style
2. **Optimistic UI**: Consider using placeholders as part of optimistic UI updates
3. **Progressive Loading**: Show content progressively as it becomes available
4. **Timeouts**: Consider showing different placeholders for extended loading times
5. **Fallback Hierarchy**: Implement a hierarchy of fallback components for different scenarios
