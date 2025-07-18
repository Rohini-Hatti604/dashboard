import { useConnection } from "@/api/client";
import { useDashboardStore } from "@/context/dashboard/dashboard.store";
import api from "@clean-start-dashboard/sdk";
import { useQuery } from "@tanstack/react-query";
//------- Search --------
export type UseRunSearchParams = Parameters<
  typeof api.functional.open_search.search
>[1];
export type UseRunSearchData = Awaited<
  ReturnType<typeof api.functional.open_search.search>
>;

export function useRunSearchQuery(initialData?: any) {
  const connection = useConnection();
  const { globalQuery } = useDashboardStore();
  const filters = {
    timeBounds: {
      min: globalQuery.timeBounds.from,
      max: globalQuery.timeBounds.to,
    },
    query: globalQuery.query
      ? globalQuery.query !== ""
        ? globalQuery.query
        : "*"
      : "*",
    queryJson: globalQuery.queryJson ?? {},
  };
  return useQuery({
    queryKey: ["search", filters],
    queryFn: () => {
      return api.functional.open_search.search(connection, {
        ...filters,
      });
    },
    initialData: () => initialData ?? {},
    enabled: !!connection.headers,
  });
}

//------- Search Alerts --------
export type UseRunSearchAlertsParams = Parameters<
  typeof api.functional.open_search.alerts
>[1];
export type UseRunSearchAlertsData = Awaited<
  ReturnType<typeof api.functional.open_search.alerts>
>;
export function useRunSearchAlertsQuery(initialData?: any) {
  const connection = useConnection();
  const { globalQuery, alertFilters } = useDashboardStore();

  // Function to apply alert filters to the query
  function applyAlertFiltersToQuery(): string {
    const baseQuery = globalQuery.query || "*";

    if (alertFilters.product || alertFilters.detectionMode) {
      return baseQuery + (alertFilters.product ? ` AND data.productName:${alertFilters.product}` : "") +
        (alertFilters.detectionMode ? ` AND rule.description:${alertFilters.detectionMode}` : "");
    }
    return baseQuery !== "" ? baseQuery : "*";
  }

  // Construct the filters object
  const filters = {
    timeBounds: {
      min: globalQuery.timeBounds.from,
      max: globalQuery.timeBounds.to,
    },
    query: globalQuery.query
      ? applyAlertFiltersToQuery() || "*"
      : "*",
    queryJson: globalQuery.queryJson ?? {},
  };
  return useQuery({
    queryKey: ["search", "alerts", filters],
    queryFn: () => {
      return api.functional.open_search.alerts(connection, {
        ...filters,
      });
    },
    initialData: () => initialData ?? {},
    enabled: !!connection.headers,
  });
}

export function useRunSearchQueryByParams(params?: any) {
  const connection = useConnection();
  const { globalQuery } = useDashboardStore();
  const filters = {
    timeBounds: {
      min: globalQuery.timeBounds.from,
      max: globalQuery.timeBounds.to,
    },
    query: params?.query ?? "*",
    queryJson: params?.queryJson ?? {},
  };
  return useQuery({
    queryKey: ["search", filters],
    queryFn: () => {
      return api.functional.open_search.search(connection, {
        ...filters,
      });
    },
    initialData: () => { },
    enabled: !!connection.headers,
  });
}

//------- Get field values --------
export type UseGetFieldValuesParams = Parameters<
  typeof api.functional.open_search.get_field_values.getFieldValues
>[1];
export type UseGetFieldValuesData = Awaited<
  ReturnType<typeof api.functional.open_search.get_field_values.getFieldValues>
>;
// product : data.productName, detection : role.description
export function useGetFieldValuesQuery(field: string) {
  const connection = useConnection();

  return useQuery({
    queryKey: ["search", "get-field-value", field],
    queryFn: () => {
      return api.functional.open_search.get_field_values.getFieldValues(
        connection,
        {
          field: field,
        }
      );
    },
    initialData: () => {
      return [];
    },
    enabled: !!field,
  });
}

//------- Get field values --------
export type UseGetFieldsParams = Parameters<
  typeof api.functional.open_search.get_fields.getFields
>;
export type UseGetFieldsData = Awaited<
  ReturnType<typeof api.functional.open_search.get_fields.getFields>
>;

export function useGetFieldsQuery() {
  const connection = useConnection();

  return useQuery({
    queryKey: ["search", "fields"],
    queryFn: () => {
      return api.functional.open_search.get_fields.getFields(connection);
    },
    initialData: () => { },
  });
}
