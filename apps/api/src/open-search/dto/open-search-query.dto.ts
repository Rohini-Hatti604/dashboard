export interface ISearchQueryRequestPayload {
  indexes: string[];
  query: any;
  aggs: any;
  options?: any;
}
