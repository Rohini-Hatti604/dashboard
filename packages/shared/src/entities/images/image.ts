import { ICVE } from "./cve";
import { IImageCategory } from "./image-category";
import { IImageVersion } from "./image-version";

export interface IImage {
    id: string; // Unique identifier for the image
    name: string; // Name of the image
    description: string; // Description of the image
    isValid: boolean; // Indicates if the image is valid
    categoryId: string; // Category can be a string representing the category ID
    category?: IImageCategory; // Optional category object for rich data
    imageUrl: string;
    architecture: string[];
    license: string;
    userId?: string; // Optional user ID for the image owner
    os: string;
    vulnerabilityIds: string[]; // Array of vulnerability IDs
    vulnerabilities?: ICVE[];
    pullCount: number; // Count of times the image has been pulled
    tags: {
        featured: {
            value: string; // Value for the featured tag, typically a short identifier
            label: string; // Label for the featured tag
            icon?: string; // Optional icon for the featured tag, used in case of tags like FIPS
        }[]; // Featured can have an optional icon property. used in case of tags like FIPS
        tags: {
            value: string; // Value for the tag, typically a short identifier
            label: string; // Label for the tag
        }[];
    };
    details: IContentBlock[]; // Details can also be an array of content blocks for rich text
    provenance: IContentBlock[]; // Provenance can also be an array of content blocks for rich text
    versionIds: string[] // Array of version IDs associated with the image
    versions?: IImageVersion[]; // Optional array of versions, if applicable
    currentVersion?: string; // Optional current version, if applicable
    updatedAt: string | Date; // Last updated date can be a string or a Date object
    publishedAt?: string | Date; // Optional published date, if applicable
};

type IContentBlock = {
    title?: string; // Optional title for the content block
    description?: string; // Optional description for the content block
    content: { text: string }[]; // content can be an array of text objects which will come handy for list items
    type: "TEXT" | "IMAGE" | "VIDEO" | "CODE" | "LIST" | "LINK"; // default is 'text'
    url?: string; // For links, images and videos
    codeLanguage?: string; // For code blocks. default is 'shell'
}