import { ICVE } from "./cve";
import { IImage } from "./image";
import { IImagePackage } from "./package";

export interface IImageVersion {
    id: string; // Unique identifier for the version
    imageId: string; // ID of the associated image
    name: string; // Version number or tag  
    image?: IImage; // Optional associated image object for rich data
    description: string; // Description of the version
    isLatest: boolean; // Indicates if this is the latest version
    releaseDate: string | Date; // Release date of the version
    releaseNotes: string; // Release notes for the version
    digest: string; // Digest of the version, typically a SHA256 hash
    size: {
        [key: string]: number
    }[]; // Array of size objects, each containing size information for different architectures
    architecture?: string[]; // Array of supported architectures
    os: string; // Operating system for the version
    license: string; // License information for the version
    pullUrl: string; // URL to pull the version from
    pullCount: number; // Count of times the version has been pulled
    updatedAt: string | Date; // Last updated date can be a string or a Date object
    packages?: IImagePackage[];
    specifications?: IImageVersionSpecifications; // Optional specifications for the version
    vulnerabilities?: ICVE[]; // Optional array of vulnerabilities associated with the version
}

export type IImageVersionSpecifications = {
    user?: string; // Name of the specification
    configuration: string; // Description of the specification
    stopSignal?: string; // Optional stop signal for the container
    workingDirectory?: string; // Optional working directory for the container
    environmentVariables?: Record<string, string> | string; // Optional environment variables for the container
    cmd: string; // Command to run in the container
    entrypoint?: string; // Optional entrypoint for the container
    hasShell?: boolean; // Indicates if the version has a shell
    hasAPK?: boolean; // Indicates if the version has APK support
}