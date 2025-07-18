export type IListImageCVERequest = {
  imageId: string;
  packageId?: undefined | string;
  imageVersionId?: undefined | string;
  page?: undefined | number;
  limit?: undefined | number;
  sortBy?: undefined | string;
  sortOrder?: undefined | "asc" | "desc";
};
