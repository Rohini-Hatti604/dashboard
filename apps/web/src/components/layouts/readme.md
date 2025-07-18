# Layouts Folder

This folder contains the common dashboard layout components and structures used throughout the application. These layout components provide the foundational structure and navigation elements for the dashboard interface.

## Core Components

### Main Layout

The main layout component serves as the primary container for all dashboard pages, providing consistent structure across different views.

```tsx
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

const MyPage = () => {
  return (
    <DashboardLayout>
      <MyPageContent />
    </DashboardLayout>
  );
};
```

### Header

The header component appears at the top of the dashboard and typically contains:

- User profile/account menu ( if needed )
- Notifications
- Search functionality
- Other functionalities ( if needed )

### Sidebar

The sidebar provides primary navigation for the dashboard:

- Main navigation menu
- Collapsible sections
- Quick links
- User profile/account menu / Logout options
- Context-specific navigation options

### Footer

The footer component appears at the bottom of pages and typically contains:

- Copyright information
- Legal links
- Additional navigation
- Version information

## Usage Guidelines

1. **Consistency**: Use these layout components for all dashboard pages to maintain structural and navigational consistency.

2. **Responsive Design**: All layout components are responsive and adapt to different screen sizes and devices.

3. **Theming**: Layout components respect the application's theme settings and can be customized according to project requirements.

4. **State Management**: Some layout components maintain their own state (like sidebar collapsed/expanded status) and might connect to global state management.

## Examples

Basic page with default layout ( Added example props that can be developed in future ):

```tsx
import { DashboardLayout } from "@/components/layouts/DashboardLayout";

function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics Dashboard"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Analytics" }]}
    >
      <AnalyticsContent />
    </DashboardLayout>
  );
}
```

Custom layout configuration ( Added example props that can be developed in future ):

```tsx
import { DashboardLayout } from "components/layouts/DashboardLayout";

function SettingsPage() {
  return (
    <DashboardLayout
      sidebarVariant="compact"
      hideFooter={true}
      headerProps={{ showSearchBar: false }}
    >
      <SettingsContent />
    </DashboardLayout>
  );
}
```

## Customization

Layout components can be customized through props to accommodate different use cases and requirements. Common customization options include:

- Hiding/showing specific layout elements
- Changing layout behavior (e.g., fixed vs. sticky headers)
- Adjusting spacing and container widths
- Specifying contextual information (page titles, breadcrumbs, etc.)
