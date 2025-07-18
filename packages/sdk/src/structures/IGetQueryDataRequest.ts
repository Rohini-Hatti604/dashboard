import type { IGetQueryDataFilter } from "./IGetQueryDataFilter";
import type { IWidgetConfig } from "./IWidgetConfig";

export type IGetQueryDataRequest = {
  filters: IGetQueryDataFilter;
  config: IWidgetConfig[];
};
