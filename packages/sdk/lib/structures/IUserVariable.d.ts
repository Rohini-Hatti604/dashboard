import type { Format } from "typia/lib/tags/Format";
export type IUserVariable = {
    id: string;
    key: string;
    value: string;
    type: string;
    scope: string;
    isPublic?: null | undefined | boolean;
    organizationId?: null | undefined | string;
    dashboardId?: null | undefined | string;
    ownerId: string;
    createdAt: string & Format<"date-time">;
    updatedAt: string & Format<"date-time">;
};
