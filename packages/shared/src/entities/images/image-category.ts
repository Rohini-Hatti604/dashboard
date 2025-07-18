import { IImage } from "./image";

export interface IImageCategory {
    id: string; // Unique identifier for the category
    name: string; // Name of the category
    description?: string;
    imageUrl?: string; // Optional image URL for the category
    updatedAt: string; // Last updated date can be a string or a Date object
    createdAt: string | Date; // Creation date can be a string or a Date object
    images?: IImage[]; // Optional array of images associated with the category
}