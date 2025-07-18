import type { EntityFilterInputIWidgetComparableAttributesIWidget } from "./EntityFilterInputIWidgetComparableAttributesIWidget";
import type { EntitySortInputIWidget } from "./EntitySortInputIWidget";

export type IListEntitiesRequestIWidget = {
  filters?: undefined | EntityFilterInputIWidgetComparableAttributesIWidget;
  sort?: undefined | EntitySortInputIWidget;
  search?: undefined | string;
  skip?: undefined | number;
  take?: undefined | number;
};
