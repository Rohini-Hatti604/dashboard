import type { EntityFilterInputIDashboardComparableAttributesIDashboard } from "./EntityFilterInputIDashboardComparableAttributesIDashboard";
import type { EntitySortInputIDashboard } from "./EntitySortInputIDashboard";

export type IListEntitiesRequestIDashboard = {
  filters?:
    | undefined
    | EntityFilterInputIDashboardComparableAttributesIDashboard;
  sort?: undefined | EntitySortInputIDashboard;
  search?: undefined | string;
  skip?: undefined | number;
  take?: undefined | number;
};
