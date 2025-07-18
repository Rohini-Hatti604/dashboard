import { useConnection } from "@/api/client";
import api from "@clean-start-dashboard/sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type UseCreateRolePayload = Parameters<
    typeof api.functional.role.create
>[1];
export type UseCreateRoleData = Awaited<
    ReturnType<typeof api.functional.role.create>
>;
export function useCreateRoleMutation() {
    const router = useRouter();
    const connection = useConnection();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: UseCreateRolePayload) => {
            return api.functional.role.create(connection, params);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
            queryClient.refetchQueries({
                queryKey: ["roles"],
            });
            router.push(`/role/manage`);
        },
    });
}

//------- Updates --------
export type UseUpdateRolePayload = Parameters<
    typeof api.functional.role.update
>[1];
export type UseUpdateRoleData = Awaited<
    ReturnType<typeof api.functional.role.update>
>;
export function useUpdateRoleMutation() {
    const router = useRouter();
    const connection = useConnection();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: UseUpdateRolePayload) => {
            return api.functional.role.update(connection, params);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["roles"],
            });
            queryClient.refetchQueries({
                queryKey: ["roles"],
            });
        },
    });
}

//  ---- lists -------
export type UseListRoleParams = Parameters<
    typeof api.functional.role.list
>[1];
export type UseListRoleData = Awaited<
    ReturnType<typeof api.functional.role.list>
>;

export function useListRoleQuery(
    params: UseListRoleParams,
    initialData?: UseListRoleData
) {
    const connection = useConnection();
    return useQuery({
        queryKey: ["roles", params],
        queryFn: () => {
            return api.functional.role.list(connection, params);
        },
        initialData: () => initialData,
        enabled: !!connection.headers,
    });
}