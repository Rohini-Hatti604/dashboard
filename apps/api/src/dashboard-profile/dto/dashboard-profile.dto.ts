import { IDashboardProfile } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetDashboardProfile extends IDashboardProfile { }

export interface ISetDefaultDashbordRequest {
  dashboardId: string;
}

export interface IAddToFavouriteRequest {
  dashboardId: string;
}
