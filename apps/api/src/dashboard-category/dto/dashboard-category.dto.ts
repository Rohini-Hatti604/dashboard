import { IDashboardCategory } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetDashboardCategory extends IDashboardCategory { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateDashboardCategoryRequest
  extends Omit<
    IDashboardCategory,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'dashboards'
    | 'ownerId'
    | 'organizationId'
  > { }

export interface IUpdateDashboardCategoryRequest
  extends ICreateDashboardCategoryRequest {
  id: string;
}

export interface IGetDashboardCategoryRequest {
  id: string;
}
