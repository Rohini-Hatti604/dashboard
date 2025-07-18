import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------- create dashboard category ------
export type UseCreateDashboardCategoryPayload = Parameters<
  typeof api.functional.dashboard_category.create
>[1];
export type UseCreateDashboardCategoryData = Awaited<
  ReturnType<typeof api.functional.dashboard_category.create>
>;
export function useCreateDashboardCategoryMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCreateDashboardCategoryPayload) => {
      return api.functional.dashboard_category.create(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard_categories"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboard_categories"],
      });
    },
  });
}

//  ---- lists -------
export type UseListDashboardCategoryParams = Parameters<
  typeof api.functional.dashboard_category.list
>[1];
export type UseListDashboardCategoryData = Awaited<
  ReturnType<typeof api.functional.dashboard_category.list>
>;

export function useListDashboardCategoryQuery(
  params: UseListDashboardCategoryParams,
  initialData?: UseListDashboardCategoryData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboard_categories", params],
    queryFn: () => {
      return api.functional.dashboard_category.list(connection, params);
    },
    initialData: () => initialData,
    enabled: true,
  });
}

//  -------- get dashboard category ----
export type UseGetDashboardCategoryParams = Parameters<
  typeof api.functional.dashboard_category.get
>[1];
export type UseGetDashboardCategoryData = Awaited<
  ReturnType<typeof api.functional.dashboard_category.get>
>;

export function useGetDashboardCategoryQuery(
  params: UseGetDashboardCategoryParams,
  initialData?: UseGetDashboardCategoryData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboard_categories", params],
    queryFn: () => {
      return api.functional.dashboard_category.get(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}
