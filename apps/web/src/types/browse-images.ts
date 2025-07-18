// Types for browse-images page

export interface FilterOption {
    id: string;
    label: string;
}

export interface FilterSection {
    id: string;
    title: string;
    options: FilterOption[];
}

export interface ImageCard {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    imageUrl: string;
}

export type GridLayoutType = "grid" | "list";

export interface ImageDetails {
    id: string;
    name: string;
    logo: string;
    tags: string[];
    fips: boolean;
    stigHardened: boolean;
    lastUpdated: string;
    vulnerabilities: number;
    pulls: number;
    dockerPull: string;
    overview: string;
    intendedUses: string[];
    usageTips: string[];
}
