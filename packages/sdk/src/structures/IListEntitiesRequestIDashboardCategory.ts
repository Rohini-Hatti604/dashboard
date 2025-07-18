import type { EntityFilterInputIDashboardCategoryComparableAttributesIDashboardCategory } from "./EntityFilterInputIDashboardCategoryComparableAttributesIDashboardCategory";
import type { EntitySortInputIDashboardCategory } from "./EntitySortInputIDashboardCategory";

export type IListEntitiesRequestIDashboardCategory = {
  filters?:
    | undefined
    | EntityFilterInputIDashboardCategoryComparableAttributesIDashboardCategory;
  sort?: undefined | EntitySortInputIDashboardCategory;
  search?: undefined | string;
  skip?: undefined | number;
  take?: undefined | number;
};
