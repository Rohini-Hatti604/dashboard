import type { EntityFilterInputIRoleComparableAttributesIRole } from "./EntityFilterInputIRoleComparableAttributesIRole";
import type { EntitySortInputIRole } from "./EntitySortInputIRole";

export type IListEntitiesRequestIRole = {
  filters?: undefined | EntityFilterInputIRoleComparableAttributesIRole;
  sort?: undefined | EntitySortInputIRole;
  search?: undefined | string;
  skip?: undefined | number;
  take?: undefined | number;
};
