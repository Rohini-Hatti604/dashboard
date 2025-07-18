import { IWidget, IWidgetConfig } from '@clean-start-dashboard/shared';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetWidget extends IWidget { }
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICreateWidgetRequest
  extends Omit<IWidget, 'id' | 'createdAt' | 'updatedAt' | 'widgetCategory'> {
  access_token?: string;
}

export interface IGetWidgetRequest {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUpdateWidgetRequest
  extends Omit<IWidget, 'createdAt' | 'updatedAt' | 'widgetCategory'> {
  access_token?: string;
}

export interface IGetQueryDataRequest {
  filters: IGetQueryDataFilter;
  config: IWidgetConfig[];
}

export interface IGetQueryDataFilter {
  timeBounds: {
    min: string;
    max: string;
    timezone?: string;
  };
  query: string;
  queryJson?: any;
  aggs?: any;
  size?: number;
  sort?: any;
}

export interface IAggs {
  [key: string]: {
    terms?: {
      field: string;
      size: number;
      order: { [key: string]: string };
      min_doc_count: number;
    };
    date_histogram?: {
      interval: string;
      field: string;
      min_doc_count: number;
      extended_bounds: {
        min: number;
        max: number;
      };
      format: string;
    };
    filters?: {
      filters: {
        [key: string]: {
          query_string: { query: string; analyze_wildcard: boolean };
        };
      };
    };
    geohash_grid?: {
      field: string;
      precision: number;
    };
    histogram?: {
      field: string;
      interval: number;
      min_doc_count: number;
    };
    aggs: IAggs;
  };
}
