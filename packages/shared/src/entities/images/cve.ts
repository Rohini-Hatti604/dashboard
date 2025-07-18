import { IImage } from "./image";
import { IImageVersion } from "./image-version";
import { IImagePackage } from "./package";

export interface ICVE {
    id: string; // Unique identifier for the vulnerability
    name: string; // Name of the vulnerability
    description: string; // Description of the vulnerability
    severity: "low" | "medium" | "high" | "critical" | "all"; // Severity level of the vulnerability
    cvssScore: number; // CVSS score of the vulnerability
    cvssVector: string; // CVSS vector string for the vulnerability
    cveId: string; // Common Vulnerabilities and Exposures ID
    fixedInVersion?: string; // Version in which the vulnerability is fixed, if applicable
    references?: string[]; // Array of references or links related to the vulnerability
    imageVersionId: string; // ID of the associated image version
    imageId: string; // ID of the associated image
    image?: IImage; // Associated image object for rich data
    imageVersion?: IImageVersion; // Optional associated image version, if applicable
    packages?: IImagePackage[]; // Optional array of packages associated with the vulnerability
    packageIds?: string[]; // Array of package IDs associated with the vulnerability, if applicable
    publishedAt: string | Date; // Date when the vulnerability was published
    detectedAt: string | Date; // Date when the vulnerability was detected
    createdAt: string | Date; // Date when the vulnerability was created
    updatedAt: string | Date; // Date when the vulnerability was last updated
    isFixed?: boolean; // Indicates if the vulnerability is fixed in the associated image version
    status: "under_investigation" | "fixed" | "not_fixed" | "confirmed" | "fix_in_progress" | "upstream_fix_available" | "upstream_fix_not_available" | "wont_fix" | "false_positive"; // Status of the vulnerability
    vulnerabilityData?: {
        [key: string]: any; // Additional data related to the vulnerability, can be any key-value pair
    }
}