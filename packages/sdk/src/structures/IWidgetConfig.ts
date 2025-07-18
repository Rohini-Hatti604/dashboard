import type { IDrilldownConfig } from "./IDrilldownConfig";

export type IWidgetConfig = {
  alias: string;
  aggregation?: any | undefined;
  chartType?: undefined | string;
  format: string;
  query: string;
  queryType: string;
  refId: string;
  drilldownConfig?: undefined | IDrilldownConfig;
  timeField: string;
};
