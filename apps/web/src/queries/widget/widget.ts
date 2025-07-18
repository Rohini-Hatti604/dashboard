// ------- create widget category ------

import { useConnection } from "@/api/client";
import { useDashboardStore } from "@/context/dashboard/dashboard.store";
import useVariableFunctions from "@/utils/hooks/variable-functions";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)
dayjs.extend(timezone)

export type UseCreateWidgetPayload = Parameters<
  typeof api.functional.widget.create
>[1];
export type UseCreateWidgetData = Awaited<
  ReturnType<typeof api.functional.widget.create>
>;
export function useCreateWidgetMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCreateWidgetPayload) => {
      return api.functional.widget.create(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
      queryClient.refetchQueries({
        queryKey: ["widgets"],
      });
    },
  });
}

//------- Aggregate --------
export type UseRunAggrigationParams = Parameters<
  typeof api.functional.widget.aggregate
>[1];
export type UseRunAggrigationData = Awaited<
  ReturnType<typeof api.functional.widget.aggregate>
>;

interface IAggregationQuery extends Omit<UseRunAggrigationParams, "filters"> {
  filters?: any;
}

export function useRunAggrigationQuery(
  params: IAggregationQuery,
  initialData?: UseListWidgetData | undefined,
  dashboardId?: string
) {
  const connection = useConnection();
  const { globalQuery } = useDashboardStore();
  const { populateVariables } = useVariableFunctions(dashboardId);


  const filters = {
    ...(params.filters ?? {}),
    timeBounds: {
      min: globalQuery.timeBounds.from ?? dayjs().subtract(7, "days").toDate(),
      max: globalQuery.timeBounds.to ?? new Date(),
      timezone: globalQuery.timeBounds.timezone ?? dayjs.tz.guess(),
    },
    query: populateVariables(globalQuery.query ?? "*"),
  };


  return useQuery({
    queryKey: [
      "aggregation",
      {
        ...params,
        config: params.config.map((c) => ({
          ...(JSON.parse(populateVariables(JSON.stringify(c)) as any)),
          query: populateVariables(c.query),
        })),
        filters,
      },
    ],
    queryFn: () => {
      return api.functional.widget.aggregate(connection, {
        ...params,
        config: params.config.map((c) => ({
          ...(JSON.parse(populateVariables(JSON.stringify(c)) as any)),
          query: populateVariables(c.query),
        })),
        filters: filters,
      });
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

export type AggregationQueryResult = {
  data: ReturnType<typeof api.functional.widget.aggregate>;
  responseTime: number;
};

export function useRunAggrigationQueryForInspect(
  params: IAggregationQuery,
  initialData?: AggregationQueryResult | undefined,
  dashboardId?: string
) {
  const connection = useConnection();
  const { globalQuery } = useDashboardStore();
  const { populateVariables } = useVariableFunctions(dashboardId);


  const filters = {
    ...(params.filters ?? {}),
    timeBounds: {
      min: globalQuery.timeBounds.from ?? dayjs().subtract(7, "days").toDate(),
      max: globalQuery.timeBounds.to ?? new Date(),
      timezone: globalQuery.timeBounds.timezone ?? dayjs.tz.guess(),
    },
    query: populateVariables(globalQuery.query ?? "*"),
  };

  return useQuery({
    queryKey: [
      "aggregationInspect",
      {
        ...params,
        config: params.config.map((c) => ({
          ...(JSON.parse(populateVariables(JSON.stringify(c)) as any)),
          query: populateVariables(c.query),
        })),
        filters,
      },
    ],
    queryFn: async () => {
      const start = performance.now();
      const data = await api.functional.widget.aggregate(connection, {
        ...params,
        config: params.config.map((c) => ({
          ...(JSON.parse(populateVariables(JSON.stringify(c)) as any)),
          query: populateVariables(c.query),
        })),
        filters: filters,
      });
      const end = performance.now();
      return {
        data,
        responseTime: end - start
      };
    },
    initialData,
    enabled: !!connection.headers,
  });
}


export function useGetAdvisoryGraphQuery(advisory_name: string) {
  return useQuery({
    queryKey: ["advisory_name", advisory_name],
    queryFn: async () => {
      const { data } = await axios.post('/api/search', {
        advisory_name
      })
      return data
    }
  })
}


//  ---- lists -------
export type UseListWidgetParams = Parameters<
  typeof api.functional.widget.list
>[1];
export type UseListWidgetData = Awaited<
  ReturnType<typeof api.functional.widget.list>
>;

export function useListWidgetQuery(
  params: UseListWidgetParams,
  initialData?: UseListWidgetData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["widgets", params],
    queryFn: () => {
      return api.functional.widget.list(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers,
  });
}

//  -------- get widget category ----
export type UseGetWidgetParams = Parameters<
  typeof api.functional.widget.get
>[1];
export type UseGetWidgetData = Awaited<
  ReturnType<typeof api.functional.widget.get>
>;

export function useGetWidgetQuery(
  params: UseGetWidgetParams,
  initialData?: UseGetWidgetData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["widgets", params],
    queryFn: () => {
      return api.functional.widget.get(connection, params);
    },
    initialData: () => initialData,
    enabled: !!connection.headers || true,
  });
}

//------- Update Widget --------
export type UseUpdateWidgetPayload = Parameters<
  typeof api.functional.widget.update
>[1];
export type UseUpdateWidgetData = Awaited<
  ReturnType<typeof api.functional.widget.update>
>;
export function useUpdateWidgetMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseUpdateWidgetPayload) => {
      return api.functional.widget.update(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["widgets"],
      });
      queryClient.refetchQueries({
        queryKey: ["widgets"],
      });
    },
  });
}
