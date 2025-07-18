import type { EntityFilterInputIUserVariableComparableAttributesIUserVariable } from "./EntityFilterInputIUserVariableComparableAttributesIUserVariable";
import type { EntitySortInputIUserVariable } from "./EntitySortInputIUserVariable";

export type IListEntitiesRequestIUserVariable = {
  filters?:
    | undefined
    | EntityFilterInputIUserVariableComparableAttributesIUserVariable;
  sort?: undefined | EntitySortInputIUserVariable;
  search?: undefined | string;
  skip?: undefined | number;
  take?: undefined | number;
};
