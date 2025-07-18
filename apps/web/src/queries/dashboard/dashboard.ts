import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type UseCreateDashboardPayload = Parameters<
  typeof api.functional.dashboard.create
>[1];
export type UseCreateDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.create>
>;
export function useCreateDashboardMutation() {
  const router = useRouter();
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCreateDashboardPayload) => {
      return api.functional.dashboard.create(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
      router.push(`/dashboard/manage`);
    },
  });
}

//------- Updates --------
export type UseUpdateDashboardPayload = Parameters<
  typeof api.functional.dashboard.update
>[1];
export type UseUpdateDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.update>
>;
export function useUpdateDashboardMutation() {
  const router = useRouter();
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseUpdateDashboardPayload) => {
      return api.functional.dashboard.update(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
    },
  });
}

//  ---- lists -------
export type UseListDashboardParams = Parameters<
  typeof api.functional.dashboard.list.list
>[1];
export type UseListDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.list.list>
>;

export function useListDashboardQuery(
  params: UseListDashboardParams,
  initialData?: UseListDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => {
      return api.functional.dashboard.list.list(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

//  ---- lists All -------
export type UseListAllDashboardParams = Parameters<
  typeof api.functional.dashboard.list_all.listAll
>[1];
export type UseListAllDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.list_all.listAll>
>;

export function useListAllDashboardQuery(
  params: UseListAllDashboardParams,
  initialData?: UseListAllDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", "All", params],
    queryFn: () => {
      return api.functional.dashboard.list_all.listAll(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

//  ---- lists / ThreatIntel-------


export function useListThreatIntelDashboardQuery(
  params: UseListDashboardParams,
  initialData?: UseListDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", "threat-intel", params],
    queryFn: () => {
      return api.functional.dashboard.list.threat_intel.listThreatIntel(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

//  -------- get dashboard ----
export type UseGetDashboardParams = Parameters<
  typeof api.functional.dashboard.get
>[1];
export type UseGetDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.get>
>;

export function useGetDashboardQuery(
  params: UseGetDashboardParams,
  initialData?: UseGetDashboardData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["dashboards", params],
    queryFn: () => {
      return api.functional.dashboard.get(connection, params);
    },
    initialData: () => initialData,
    enabled: !!params.id,
  });
}

// Delete Dashboard
export type UseDeleteDashboardParams = Parameters<
  typeof api.functional.dashboard.$delete
>[1];
export type UseDeleteDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.$delete>
>;

export function useRemoveDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseDeleteDashboardParams) => {
      return api.functional.dashboard.$delete(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
    },
  });
}

//  -------clone ----

export type UseCloneDashboardParams = Parameters<
  typeof api.functional.dashboard.clone
>[1];
export type UseCloneDashboardData = Awaited<
  ReturnType<typeof api.functional.dashboard.clone>
>;
export function useCloneDashboardMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCloneDashboardParams) => {
      return api.functional.dashboard.clone(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboards"],
      });
      queryClient.refetchQueries({
        queryKey: ["dashboards"],
      });
    },
  });
}
