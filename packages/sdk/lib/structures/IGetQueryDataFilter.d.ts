export type IGetQueryDataFilter = {
    timeBounds: {
        min: string;
        max: string;
        timezone?: undefined | string;
    };
    query: string;
    queryJson?: any | undefined;
    aggs?: any | undefined;
    size?: undefined | number;
    sort?: any | undefined;
};
