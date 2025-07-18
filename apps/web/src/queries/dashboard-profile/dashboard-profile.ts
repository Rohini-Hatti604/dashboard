import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//  -------- get dashboard profile ----
export type UseGetDashboardProfileParams = Parameters<
  typeof api.functional.dashboard_profile.get
>[];
export type UseGetDashboardProfileData = Awaited<
  ReturnType<typeof api.functional.dashboard_profile.get>
>;

export function useGetDashboardProfileQuery(
  initialData?: UseGetDashboardProfileData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboard_profile"],
    queryFn: () => {
      const userdetails = api.functional.dashboard_profile.get(connection);
      return userdetails;
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

//------- Set Default --------
export type UseSetDefaultDashboardPayload = Parameters<
  typeof api.functional.dashboard_profile.set_default_dashboard.setDefaultDashboard
>[1];
export type UseSetDefaultDashboardData = Awaited<
  ReturnType<
    typeof api.functional.dashboard_profile.set_default_dashboard.setDefaultDashboard
  >
>;
export function useSetDefaultDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseSetDefaultDashboardPayload) => {
      return api.functional.dashboard_profile.set_default_dashboard.setDefaultDashboard(
        connection,
        params
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard_profile"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboard_profile"],
      });
    },
  });
}

//------- Fav --------
export type UseAddFavouriteDashboardPayload = Parameters<
  typeof api.functional.dashboard_profile.favourite.add.addToFavourite
>[1];
export type UseAddFavouriteDashboardData = Awaited<
  ReturnType<
    typeof api.functional.dashboard_profile.favourite.add.addToFavourite
  >
>;
export function useAddFavouriteDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseAddFavouriteDashboardPayload) => {
      return api.functional.dashboard_profile.favourite.add.addToFavourite(
        connection,
        params
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard_profile"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboard_profile"],
      });
    },
  });
}

//-------remove Fav --------
export type UseRemoveFavouriteDashboardPayload = Parameters<
  typeof api.functional.dashboard_profile.favourite.remove.removeFromFavourite
>[1];
export type UseRemoveFavouriteDashboardData = Awaited<
  ReturnType<
    typeof api.functional.dashboard_profile.favourite.remove.removeFromFavourite
  >
>;
export function useRemoveFavouriteDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseRemoveFavouriteDashboardPayload) => {
      return api.functional.dashboard_profile.favourite.remove.removeFromFavourite(
        connection,
        params
      );
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard_profile"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboard_profile"],
      });
    },
  });
}
