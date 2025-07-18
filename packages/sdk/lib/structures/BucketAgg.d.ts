export type BucketAgg = {
    field?: undefined | string;
    id: string;
    settings: {
        min_doc_count?: undefined | string;
        order?: undefined | string;
        orderBy?: undefined | string;
        size?: undefined | string;
        interval?: undefined | string;
        trimEdges?: undefined | string;
        filters?: undefined | {
            label: string;
            query: string;
        }[];
        precision?: undefined | string;
    };
    type: string;
};
