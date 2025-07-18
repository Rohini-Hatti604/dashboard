import { IImage } from "@clean-start-dashboard/shared";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IListImagesResponse extends IImage { }

export interface IListImageRequest {
    categoryId?: string[]; // Optional, if you want to filter by category
    page?: number; // Optional, for pagination
    limit?: number; // Optional, for pagination
    sortBy?: string; // Optional, for sorting
    sortOrder?: 'asc' | 'desc'; // Optional, for sorting order
    name?: string; // Optional, to filter by name
    architecture?: string[]; // Optional, to filter by architecture
    os?: string; // Optional, to filter by OS
}

export interface IListImageVersionRequest {
    categoryId?: string; // Optional, if you want to filter by category
    imageId?: string; // Optional, if you want to filter by image ID
    page?: number; // Optional, for pagination
    limit?: number; // Optional, for pagination
    sortBy?: string; // Optional, for sorting
    sortOrder?: 'asc' | 'desc'; // Optional, for sorting order
    name?: string; // Optional, to filter by name
    architecture?: string[]; // Optional, to filter by architecture
    os?: string; // Optional, to filter by OS
}


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGetImageResponse extends IImage { }
export interface IGetImageByNameRequest {
    name: string;
}

export interface IGetImageByIdRequest {
    id: string;
}


// Image CVE
export interface IListImageCVERequest {
    imageId: string; // The ID of the image to filter CVEs
    packageId?: string; // Optional, to filter by package ID
    imageVersionId?: string; // Optional, to filter by image version ID
    page?: number; // Optional, for pagination
    limit?: number; // Optional, for pagination
    sortBy?: string; // Optional, for sorting
    sortOrder?: 'asc' | 'desc'; // Optional, for sorting order
}