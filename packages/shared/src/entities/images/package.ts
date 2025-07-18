export interface IImagePackage {
    id: string; // Unique identifier for the package
    name: string; // Name of the package
    description?: string; // Description of the package
    version: string; // Version of the package
    imageVersionId: string // ID of the associated image version
    repositoryUrl?: string; // URL of the repository where the package is hosted
    repositoryName: string; // Name of the repository
    packageUrl?: string; // URL to download the package
    size: number; // Size of the package in bytes
    architecture: string[]; // Array of supported architectures
    license: string; // License information for the package
    sbomDocumentUrl?: string; // URL to the SBOM document, if available
}