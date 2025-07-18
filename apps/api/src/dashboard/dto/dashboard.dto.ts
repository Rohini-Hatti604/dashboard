import { IDashboard } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetDashboard extends IDashboard { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateDashboardRequest
  extends Omit<
    IDashboard,
    'id' | 'createdAt' | 'updatedAt' | 'dashboardCategory' | 'parent' | 'children'
  > { }

export interface IGetDashboardRequest {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUpdateDashboardRequest
  extends Omit<
    IDashboard,
    | 'createdAt'
    | 'updatedAt'
    | 'dashboardCategory'
    | 'dashboardCategoryId'
    | 'parentId'
    | 'name'
  > {
  name?: string;
  dashboardCategoryId?: string;
  parentId?: string;
}
