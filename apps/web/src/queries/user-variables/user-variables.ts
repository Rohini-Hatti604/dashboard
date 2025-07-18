import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------- create user variable ------
export type UseCreateUserVariablePayload = Parameters<
  typeof api.functional.user_variable.create
>[1];
export type UseCreateUserVariableData = Awaited<
  ReturnType<typeof api.functional.user_variable.create>
>;
export function useCreateUserVariableMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseCreateUserVariablePayload) => {
      return api.functional.user_variable.create(connection, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-varibles"],
      });
      queryClient.refetchQueries({
        queryKey: ["user-varibles"],
      });
    },
  });
}

//  ---- lists -------
export type UseListUserVariableParams = Parameters<
  typeof api.functional.user_variable.list
>[1];
export type UseListUserVariableData = Awaited<
  ReturnType<typeof api.functional.user_variable.list>
>;

export function useListUserVariableQuery(
  params: UseListUserVariableParams,
  initialData?: UseListUserVariableData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["user-varibles", params],
    queryFn: () => {
      return api.functional.user_variable.list(connection, params);
    },
    initialData: () => initialData,
    enabled: true,
  });
}

//  -------- get user variable ----
export type UseGetUserVariableParams = Parameters<
  typeof api.functional.user_variable.get
>[1];
export type UseGetUserVariableData = Awaited<
  ReturnType<typeof api.functional.user_variable.get>
>;

export function useGetUserVariableQuery(
  params: UseGetUserVariableParams,
  initialData?: UseGetUserVariableData
) {
  const connection = useConnection();
  return useQuery({
    queryKey: ["user-varibles", params],
    queryFn: () => {
      return api.functional.user_variable.get(connection, params);
    },
    initialData: () => initialData,
    enabled: !!params.id,
  });
}

//------- Update UserVariable --------
export type UseUpdateUserVariablePayload = Parameters<
  typeof api.functional.user_variable.update
>[1];
export type UseUpdateUserVariableData = Awaited<
  ReturnType<typeof api.functional.user_variable.update>
>;
export function useUpdateUserVariableMutation() {
  const connection = useConnection();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UseUpdateUserVariablePayload) => {
      return api.functional.user_variable.update(connection, params);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user-varibles"],
      });
      queryClient.refetchQueries({
        queryKey: ["user-varibles"],
      });
    },
  });
}
