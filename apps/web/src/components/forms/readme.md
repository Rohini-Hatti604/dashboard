# Forms Folder

This folder contains all the form components used throughout the frontend application along with their associated validation logic. Each form is organized in a dedicated subfolder containing both the form component and its validation file.

## Folder Structure

```
forms/
├── auth/
│   ├── login-form.tsx
│   └── login-validation.ts
├── dashboard/
│   ├── create-dashboard-form.tsx
│   ├── create-dashboard-validation.ts
│   ├── edit-dashboard-form.tsx
│   └── edit-dashboard-validation.ts
├── widget/
│   ├── widget-configuration-form.tsx
│   └── widget-configuration-validation.ts
└── ... (other form directories)
```

## Naming Conventions

Form files follow a consistent naming convention:

- **Form Component**: `[section]-[feature]-form.tsx`
- **Validation File**: `[section]-[feature]-validation.ts`

For example:

- `auth-login-form.tsx` and `auth-login-validation.ts`
- `dashboard-create-form.tsx` and `dashboard-create-validation.ts`
- `user-profile-form.tsx` and `user-profile-validation.ts`

## Form Component Guidelines

Each form component should:

1. Import its validation schema from the validation file
2. Handle form submission and validation errors
3. Connect to the appropriate data fetching/mutation hooks
4. Provide proper feedback to users during submission
5. Implement accessibility best practices

Example form component:

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { dashboardCreateSchema } from "./dashboard-create-validation";
import { useCreateDashboardMutation } from "@/queries/dashboard/dashboard";

export function DashboardCreateForm() {
  const { mutate, isPending } = useCreateDashboardMutation();

  const form = useForm({
    resolver: zodResolver(dashboardCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      // Other fields...
    },
  });

  function onSubmit(values) {
    mutate(values);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
  );
}
```

## Validation Guidelines

Validation files should:

1. Use Zod or a similar schema validation library
2. Export the schema for reuse in form components
3. Include appropriate error messages for each validation rule
4. Handle all required validations for the associated form

Example validation file:

```ts
import { z } from "zod";

export const dashboardCreateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  dashboardCategoryId: z.string().min(1, "Dashboard category is required"),
  isPublic: z.boolean().default(false),
  // Other fields...
});

export type DashboardCreateFormValues = z.infer<typeof dashboardCreateSchema>;
```

## Form Reusability

Common form elements and patterns should be extracted into reusable components in the `inputs` folder. Forms should leverage these common components to maintain consistency across the application.

## Integration with API

Forms should integrate with the application's API layer using the appropriate hooks from the queries directory. Each form should:

1. Import and use the appropriate mutation hook
2. Handle loading, success, and error states
3. Provide feedback to users about submission status
4. Redirect or display confirmation messages on success

## Accessibility

All forms should be accessible according to WCAG guidelines:

1. Use proper semantic HTML elements
2. Include proper aria attributes where necessary
3. Ensure keyboard navigation works correctly
4. Provide clear validation error messages
5. Maintain sufficient color contrast for all users
