export type IUpdateUserVariableRequest = {
    type: "TEXT" | "NUMERICAL" | "TIME_BASED";
    scope: "DASHBOARD" | "ORGANIZATION";
    id: string;
    isPublic?: null | undefined | boolean;
    key: string;
    value: string;
    dashboardId?: null | undefined | string;
};
