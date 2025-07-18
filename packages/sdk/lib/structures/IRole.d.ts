import type { Format } from "typia/lib/tags/Format";
export type IRole = {
    id: string;
    roleId?: null | undefined | string;
    name: string;
    description?: null | undefined | string;
    isActive?: null | undefined | boolean;
    isPublic?: null | undefined | boolean;
    permissions: string[];
    organizationId?: null | undefined | string;
    createdAt: string & Format<"date-time">;
    updatedAt: string & Format<"date-time">;
};
