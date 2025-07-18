export type IDrilldownConfig = {
    type: "COUNT" | "DASHBOARD";
    aggregation?: any | undefined;
    query?: undefined | string;
    enabled?: undefined | boolean;
    valueSelector?: undefined | "Y_AXIS" | "X_AXIS" | "CATEGORY";
    url?: undefined | string;
};
