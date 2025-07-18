import type { IDashboard } from "./IDashboard";
import type { IDashboardElement } from "./IDashboardElement";
export type IUpdateDashboardRequest = {
    name?: undefined | string;
    dashboardCategoryId?: undefined | string;
    parentId?: undefined | string;
    type?: null | undefined | string;
    id: string;
    tags?: undefined | string[];
    isPublic?: undefined | boolean;
    ownerId?: null | undefined | string;
    elements?: undefined | IDashboardElement[];
    parent?: undefined | IDashboard;
    children?: any | undefined;
};
