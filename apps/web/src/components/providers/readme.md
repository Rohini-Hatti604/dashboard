# Providers Folder

This folder contains React context providers that manage and distribute shared state, configuration, and services throughout the application. These providers serve as the backbone for cross-cutting concerns and global application state.

## Purpose

The providers folder organizes components that:

1. Establish React contexts for state management
2. Provide configuration and environment variables to components
3. Set up global services and API connections
4. Handle authentication and authorization state
5. Manage theme and appearance preferences
6. Configure global libraries and tools

## Folder Structure

```
providers/
├── app-provider.tsx           # Root provider that composes all other providers
├── auth-provider.tsx          # Authentication state and methods
├── theme-provider.tsx         # Theme preferences and customization
├── toast-provider.tsx         # Global notification system
├── query-provider.tsx         # API data fetching configuration
├── config-provider.tsx        # Application configuration
├── modal-provider.tsx         # Global modal management
└── ... (other providers)
```

## Core Providers

### App Provider

The root provider that composes all other providers to simplify the application setup:

```tsx
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>
              <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}
```

### Auth Provider

Manages authentication state, user sessions, and authorization:

```tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication logic...

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

### Theme Provider

Handles theme preferences, color schemes, and appearance settings:

```tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Theme management logic...

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div data-theme={resolvedTheme}>{children}</div>
    </ThemeContext.Provider>
  );
}
```

### Query Provider

Configures data fetching libraries and provides global query settings:

```tsx
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

## Usage Example

Using provider contexts in components:

```tsx
import { useAuth } from "@/components/providers/auth-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { useToast } from "@/components/providers/toast-provider";

export function UserProfileButton() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      type: "success",
    });
  };

  return (
    <div>
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Provider Guidelines

When creating or modifying providers:

1. **Single Responsibility**: Each provider should focus on a specific concern
2. **Composition**: Compose providers rather than creating monolithic ones
3. **Performance**: Minimize unnecessary re-renders with context splitting
4. **TypeScript**: Fully type the context values and provider props
5. **Error Handling**: Include error boundaries where appropriate
6. **Initialization**: Handle initial loading states for async operations
7. **Custom Hooks**: Create custom hooks to access context values

## Provider Hooks

Each provider should expose a custom hook for consuming its context:

```tsx
// Inside auth-provider.tsx
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Usage in components
const { user, logout } = useAuth();
```

## Provider Initialization

Providers that need initialization should handle loading states:

```tsx
export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch("/api/config");
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);

  if (isLoading) return <AppLoadingSpinner />;
  if (error) return <AppErrorState error={error} />;
  if (!config)
    return <AppErrorState error={new Error("Failed to load configuration")} />;

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
```

## Best Practices

1. **Avoid Deep Provider Nesting**: Flatten provider hierarchy where possible
2. **Use Memoization**: Memoize context values to prevent unnecessary re-renders
3. **Default Values**: Provide sensible default values for contexts
4. **Error Boundaries**: Wrap providers with error boundaries for resilience
5. **Testing**: Create test utilities for mocking providers in component tests
6. **Lazy Initialization**: Use lazy initialization for expensive computations
7. **Server Components**: Consider compatibility with React Server Components where applicable
