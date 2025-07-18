import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//  -------- get dashboard category ----
export type UseGetUserData = Awaited<
  ReturnType<typeof api.functional.auth.get_user_details.getUserDetails>
>;

export function useGetUserQuery(initialData?: UseGetUserData) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["auth", "user", connection.headers?.session_id],
    queryFn: () => {
      return api.functional.auth.get_user_details.getUserDetails(connection);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

// Logout

export function useLogoutMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return api.functional.auth.logout(connection);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      queryClient.refetchQueries({
        queryKey: ["auth"],
      });
    },
  });
}
