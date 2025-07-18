# Context Folder

This folder contains React context definitions, providers, and associated hooks for managing and sharing state across components throughout the application. Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## Purpose

The context folder organizes:

1. Context definitions for different domains of state
2. Context provider components that supply state values
3. Custom hooks for easy consumption of context values
4. TypeScript types for context values and provider props
5. Initial/default state values for contexts

## Folder Structure

```
context/
├── auth/
│   ├── auth-context.tsx       # Authentication context definition
│   ├── auth-provider.tsx      # Authentication provider implementation
│   └── use-auth.tsx           # Hook for accessing authentication context
├── theme/
│   ├── theme-context.tsx      # Theme context definition
│   ├── theme-provider.tsx     # Theme provider implementation
│   └── use-theme.tsx          # Hook for accessing theme context
├── dashboard/
│   ├── dashboard-context.tsx  # Dashboard state context definition
│   ├── dashboard-provider.tsx # Dashboard state provider implementation
│   └── use-dashboard.tsx      # Hook for accessing dashboard context
└── ... (other context domains)
```

## Context Organization Pattern

Each context domain typically follows a three-file pattern:

1. **Context Definition** (`*-context.tsx`) - Creates the React context with types
2. **Provider Implementation** (`*-provider.tsx`) - Implements the state logic
3. **Consumer Hook** (`use-*.tsx`) - Custom hook for consuming the context

### Context Definition Example

```tsx
// auth-context.tsx
import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

// Default context value
export const defaultAuthContext: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {
    throw new Error("AuthProvider not implemented");
  },
  logout: async () => {
    throw new Error("AuthProvider not implemented");
  },
  register: async () => {
    throw new Error("AuthProvider not implemented");
  },
};

export const AuthContext = createContext<AuthContextValue>(defaultAuthContext);
```

### Provider Implementation Example

```tsx
// auth-provider.tsx
import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User, defaultAuthContext } from "./auth-context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check for existing session on load
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Authentication failed")
        );
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Login failed"));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    // Logout implementation...
  }

  async function register(data: any) {
    // Registration implementation...
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

### Consumer Hook Example

```tsx
// use-auth.tsx
import { useContext } from "react";
import { AuthContext } from "./auth-context";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
```

## Usage in Components

```tsx
import { useAuth } from "@/context/auth/use-auth";
import { Button } from "@/components/ui/button";

export function ProfileSection() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
```

## Context Provider Composition

For applications with multiple contexts, providers are typically composed in the application root:

```tsx
// _app.tsx or layout.tsx
import { AuthProvider } from "@/context/auth/auth-provider";
import { ThemeProvider } from "@/context/theme/theme-provider";
import { DashboardProvider } from "@/context/dashboard/dashboard-provider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DashboardProvider>
          <Component {...pageProps} />
        </DashboardProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

## Context Design Guidelines

1. **Divide by Domain**: Create separate contexts for distinct domains of state
2. **Minimize Re-renders**: Structure context to prevent unnecessary re-renders
3. **Type Safety**: Use TypeScript to ensure type safety of context values
4. **Error Handling**: Include error states and error handling
5. **Default Values**: Provide meaningful default values for contexts
6. **Loading States**: Include loading states for asynchronous operations
7. **Context Boundaries**: Define clear boundaries between contexts

## Performance Considerations

1. **Value Memoization**: Use `useMemo` to prevent unnecessary re-renders
2. **Context Splitting**: Split contexts by update frequency
3. **Selector Pattern**: Implement selector pattern for large contexts
4. **Lazy Initialization**: Use lazy initialization for complex state

## Best Practices

1. **Document Context APIs**: Add JSDoc comments to context interfaces
2. **Consumer Validation**: Validate context usage with explicit errors
3. **Consistent Naming**: Follow consistent naming conventions
4. **Testing Utilities**: Provide testing utilities for mocking contexts
5. **Avoid Deeply Nested Providers**: Consider composition alternatives
6. **State Isolation**: Keep state contained to appropriate context levels
7. **Prefer Composition**: Use component composition where appropriate instead of context
