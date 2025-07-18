import { IDashboardCategory } from "./dashboard-category";

export interface IWidget {
  id: string;
  title: string;
  isPublic?: boolean;
  type: string;
  tags?: string[];
  config: IWidgetConfig[];
  widgetCategoryId?: string;
  widgetCategory?: IDashboardCategory;
  renderMethod?: "STATIC" | "DYNAMIC" | null;
  //timestamp
  createdAt: Date;
  updatedAt: Date;
}

export interface IWidgetConfig {
  alias: string;
  aggregation?: any;
  chartType?: string;
  format: string;
  query: string;
  queryType: string;
  refId: string;
  drilldownConfig?: IDrilldownConfig;
  timeField: string;
}

export type IChartType = "PIE" | "BAR" | "LINE" | "DOUGHNUT" | "AREA" | "TABLE" | "GAUGE" | "HEATMAP" | "MAP" | "GEO" | "HISTOGRAM" | "SCATTER" | "SUNBURST" | "TREEMAP" | "FUNNEL" | "WORD_CLOUD" | "NETWORK" | "CANDLESTICK";


export type BucketAgg = {
  field?: string;
  id: string;
  settings: {
    min_doc_count?: string;
    order?: string;
    orderBy?: string;
    size?: string;
    interval?: string;
    trimEdges?: string;
    filters?: { label: string; query: string }[];
    precision?: string;
  };
  type: string;
};

export interface IMetric {
  id: string;
  type: string;
  field?: string;
}

// DrilldownConfig
export type IDrilldownConfig = {
  type: "COUNT" | "DASHBOARD";
  aggregation?: any;
  query?: string;
  enabled?: boolean;
  valueSelector?: "Y_AXIS" | "X_AXIS" | 'CATEGORY';
  url?: string; // dashboard/jhi/?productName=[[productName]]
}
