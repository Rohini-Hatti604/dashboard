export type IListImageVersionRequest = {
    categoryId?: undefined | string;
    imageId?: undefined | string;
    page?: undefined | number;
    limit?: undefined | number;
    sortBy?: undefined | string;
    sortOrder?: undefined | "asc" | "desc";
    name?: undefined | string;
    architecture?: undefined | string[];
    os?: undefined | string;
};
