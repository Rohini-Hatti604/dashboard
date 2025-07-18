import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

/**
 * Error handler that signs out user on unauthorized exception
 */
export function handleUnauthorizedError(error: any) {
  if (error.status === 401) {
    // signOut();
    console.log("Unauthorized");
  }
}

/**
 * Create a query client
 */
export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: handleUnauthorizedError,
    }),
    mutationCache: new MutationCache({
      onError: handleUnauthorizedError,
    }),
    defaultOptions: {
      queries: {
        retry(failureCount, error: any) {
          if (failureCount < 2) return true;
          else return false;
        },
        refetchOnWindowFocus: false,
      },
    },
  });
}
