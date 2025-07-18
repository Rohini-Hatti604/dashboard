export type ICreateUserVariableRequest = {
  type: "TEXT" | "NUMERICAL" | "TIME_BASED";
  scope: "DASHBOARD" | "ORGANIZATION";
  isPublic?: null | undefined | boolean;
  key: string;
  value: string;
  dashboardId?: null | undefined | string;
};
