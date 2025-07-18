import type { IDashboardElement } from "./IDashboardElement";
export type ICreateDashboardRequest = {
    type?: null | undefined | string;
    name: string;
    tags?: undefined | string[];
    isPublic?: undefined | boolean;
    ownerId?: null | undefined | string;
    dashboardCategoryId: string;
    parentId?: null | undefined | string;
    elements?: undefined | IDashboardElement[];
};
