# Tables Folder

This folder contains all the table components used throughout the frontend application. Each table is organized in a dedicated subfolder containing both the table component and its column definition component, separating the display logic from column configuration.

## Folder Structure

```
tables/
├── dashboard/
│   ├── dashboard-list.table.tsx
│   └── dashboard-list.columns.tsx
├── users/
│   ├── users-management.table.tsx
│   └── users-management.columns.tsx
├── widgets/
│   ├── widget-library.table.tsx
│   └── widget-library.columns.tsx
└── ... (other table directories)
```

## Naming Conventions

Table files follow a consistent naming convention:

- **Table Component**: `[section]-[feature].table.tsx`
- **Column Definition**: `[section]-[feature].columns.tsx`

For example:

- `dashboard-list.table.tsx` and `dashboard-list.columns.tsx`
- `users-management.table.tsx` and `users-management.columns.tsx`
- `audit-logs.table.tsx` and `audit-logs.columns.tsx`

## Table Component Guidelines

Each table component should:

1. Import its column definitions from the columns file
2. Handle data fetching/pagination logic or accept data as props
3. Implement sorting, filtering, and pagination where appropriate
4. Include proper loading and empty states
5. Support accessibility features

Example table component:

```tsx
import { DataTable } from "@/components/ui/data-table";
import { useListDashboardQuery } from "@/queries/dashboard/dashboard";
import { dashboardListColumns } from "./dashboard-list-columns";

export function DashboardListTable() {
  const { data, isLoading } = useListDashboardQuery({ limit: 10, page: 1 });

  return (
    <DataTable
      columns={dashboardListColumns}
      data={data?.items || []}
      isLoading={isLoading}
      pagination={{
        pageCount: data?.meta?.pageCount || 0,
        pageSize: 10,
      }}
    />
  );
}
```

## Column Definition Guidelines

Column definition files should:

1. Define all columns including headers, accessors, and cell renderers
2. Configure sorting, filtering, and other column-specific options
3. Include action columns with their respective handlers
4. Handle data formatting and display logic

Example column definition file:

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format-date";
import { Dashboard } from "@clean-start-dashboard/shared";

export const dashboardListColumns: ColumnDef<Dashboard>[] = [
  {
    accessorKey: "name",
    header: "Dashboard Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
    sortingFn: "datetime",
  },
  {
    accessorKey: "isPublic",
    header: "Visibility",
    cell: ({ row }) => (row.getValue("isPublic") ? "Public" : "Private"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
  },
];
```

## Advanced Table Features

Tables should implement these features as needed:

1. **Row Selection**: Multi-row selection capabilities
2. **Expandable Rows**: Detail views for complex data
3. **Custom Filtering**: Column-specific filtering options
4. **Persistence**: Saving table state (sorting, filtering) preferences
5. **Export Options**: CSV/Excel export functionality
6. **Responsive Design**: Mobile-friendly table layouts

## Integration with Data Fetching

Tables should integrate with the application's data fetching layer using the appropriate hooks:

1. Implement proper pagination using API pagination parameters
2. Support server-side sorting if available
3. Handle loading and error states gracefully
4. Implement data refetching strategies
5. Support real-time updates where applicable

## Accessibility

All tables should be accessible according to WCAG guidelines:

1. Use proper semantic HTML table elements when appropriate
2. Include proper aria attributes for interactive elements
3. Maintain keyboard navigation support
4. Provide sufficient color contrast
5. Include proper screen reader support for complex tables

## Reusability and Composability

Extract common table functionality into reusable components:

1. Use a base DataTable component that handles common table features
2. Create reusable cell renderers for common data types
3. Share filtering and sorting logic across tables
4. Create reusable action button components for tables
