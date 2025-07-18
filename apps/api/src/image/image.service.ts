import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenSearchService } from 'src/open-search/open-search.service';
import imagesCategoryData from './data/category-index.json';
import imageCVEData from './data/cves-index.json';
import imagesData from './data/image-index.json';
import packagesData from './data/packages-index.json';
import imagesVersionData from './data/version-index.json';
import { IListImageCVERequest, IListImageRequest, IListImageVersionRequest } from './dto/image.dto';

@Injectable()
export class ImageService {
    private readonly logger = new Logger(ImageService.name);

    constructor(private configService: ConfigService, private searchService: OpenSearchService) {
        // Initialize any necessary services or configurations here
        this.logger.log('ImageService initialized');
    }

    // Image methods

    /**
     * Lists images based on the provided filters and pagination.
     * @param inputs - The request parameters for filtering and pagination.
     * @returns A promise that resolves to an array of images.
     */
    public async listImage(inputs: IListImageRequest): Promise<any[]> {


        let filters: any[] = []


        // Convert the inputs to a opensearch query format if necessary
        if (inputs) {
            filters = [
                // Add any necessary filters based on inputs
                ...(inputs.categoryId ? [{ terms: { categoryId: inputs.categoryId } }] : []),
                ...(inputs.name ? [{ match: { name: inputs.name } }] : []),
                ...(inputs.architecture ? [{ terms: { architecture: inputs.architecture } }] : []),
                ...(inputs.os ? [{ term: { os: inputs.os } }] : []),
            ]
        }
        // If sortBy and sortOrder are provided, add sorting to the filters
        if (inputs.sortBy && inputs.sortOrder) {
            filters.push({
                sort: {
                    [inputs.sortBy]: {
                        order: inputs.sortOrder,
                    },
                },
            });
        }

        const params = [
            {
                index: 'images',
            },
            {
                query: {
                    bool: {

                        filter: [
                            // ...(query.queryJson ? query.queryJson?.bool?.filter : []),
                            //   {
                            //     query_string: {
                            //       analyze_wildcard: true,
                            //       query: 'data.tenant:' + user?.user_data.tenant.tenant_code,
                            //     },
                            //   },

                            ...filters,
                        ],

                    },
                },
                // aggs: {},
                size: inputs.limit || 100, // Default to 100 if limit is not provided
                from: ((inputs.page ?? 1) - 1) * (inputs.limit || 100), // Calculate the starting index for pagination
            },
        ];

        // return this.searchService.aggregateQuery(params);
        const response = this.searchService.aggregateQuery(params);

        return response.then(data => {
            this.logger.log(`Found  images`);
            return data?.body?.responses[0]?.hits.hits.map(hit => hit._source) || [];
        }).catch(error => {
            this.logger.error('Error listing images:', error);
            throw error;
        });
    }

    /**
     * Retrieves an image by its ID.
     * @param id - The ID of the image to retrieve.
     * @returns A promise that resolves to the image data.
     */
    public async getImage(id: string): Promise<any> {
        const data = imagesData.find((image) => image.id === id);

        // Return the data property from the response
        return data;
    }

    /**
     * Retrieves an image by its name.
     * @param name - The name of the image to retrieve.
     * @returns A promise that resolves to the image data.
     */
    public async getImageByName(name: string): Promise<any> {
        const data = imagesData.find((image) => image.name === name);

        // Return the data property from the response
        return data;
    }

    /**
     * Retrieves images by category ID.
     * @param categoryId - The ID of the category to filter images by.
     * @returns A promise that resolves to an array of images in the specified category.
     */
    public async getImageByCategoryId(categoryId: string): Promise<any[]> {
        this.logger.log(`Getting images by category ID: ${categoryId}`);
        const data = imagesData.filter((image) => image.categoryId === categoryId);

        // Return the data property from the response
        return data;
    }

    // Image Version methods

    /**
     * Retrieves an image version by its ID.
     * @param id - The ID of the image version to retrieve.
     * @returns A promise that resolves to the image version data.
     */
    public async getImageVersionById(id: string): Promise<any> {
        this.logger.log(`Getting image version by ID: ${id}`);
        const data = imagesVersionData.find((image) => image.id === id);

        if (!data) {
            this.logger.error(`Image version with ID ${id} not found`);
            throw new Error(`Image version with ID ${id} not found`);
        }

        // Return the data property from the response
        return data;

    }

    /**
     * Lists image versions based on the provided filters and pagination.
     * @param inputs - The request parameters for filtering and pagination.
     * @returns A promise that resolves to an array of image versions.
     */

    public async listImageVersion(inputs: IListImageVersionRequest): Promise<any[]> {
        this.logger.log('Listing image versions from data');
        if (!imagesVersionData || !Array.isArray(imagesVersionData)) {
            this.logger.error('Image version data is not available or is not an array');
            throw new Error('Image version data is not available or is not an array');
        }

        // If inputs are provided, filter the image versions based on the inputs
        if (inputs) {
            let filteredVersions = imagesVersionData;

            // Filter by imageId if provided

            if (inputs.imageId) {
                filteredVersions = filteredVersions.filter(version => version.imageId === inputs.imageId);
            }

            if (inputs.categoryId) {
                filteredVersions = filteredVersions.filter(version => version.imageId === inputs.categoryId);
            }

            // Implement pagination if page and limit are provided
            if (inputs.page !== undefined && inputs.limit !== undefined) {
                const startIndex = (inputs.page - 1) * inputs.limit;
                const endIndex = startIndex + inputs.limit;
                filteredVersions = filteredVersions.slice(startIndex, endIndex);
            }

            // Sort the versions if sortBy and sortOrder are provided
            if (inputs.sortBy) {
                filteredVersions.sort((a, b) => {
                    const aValue = a[inputs.sortBy as string];
                    const bValue = b[inputs.sortBy as string];
                    if (aValue < bValue) return inputs.sortOrder === 'asc' ? -1 : 1;
                    if (aValue > bValue) return inputs.sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            }


            return filteredVersions;
        }
        return imagesVersionData;
    }

    // Image category methods

    /**
     * Lists image categories.
     * @returns A promise that resolves to an array of image categories.
     */
    public async listImageCategory(): Promise<any[]> {
        // Return the data property from the response
        this.logger.log('Listing image categories from data');
        if (!imagesCategoryData || !Array.isArray(imagesCategoryData)) {
            this.logger.error('Image data is not available or is not an array');
            throw new Error('Image data is not available or is not an array');
        }
        return imagesCategoryData; // Assuming categories are part of the same data structure
    }

    /**
     * Retrieves an image category by its ID.
     * @param id - The ID of the image category to retrieve.
     * @returns A promise that resolves to the image category data.
     */
    public async getImageCategory(id: string): Promise<any> {
        const data = imagesCategoryData.find((category) => category.id === id);

        // Return the data property from the response
        return data;
    }


    // Image CVEs Methods

    /**
     * Lists CVEs for a specific image based on the provided filters and pagination.
     * @param inputs - The request parameters for filtering and pagination.   
     * @returns A promise that resolves to an array of CVEs for the specified image.
     */
    public async listImageCVE(inputs: IListImageCVERequest): Promise<any[]> {

        this.logger.log(`Listing CVEs for image ID: ${inputs.imageId}`);
        if (!imageCVEData || !Array.isArray(imageCVEData)) {
            this.logger.error('Image CVE data is not available or is not an array');
            throw new Error('Image CVE data is not available or is not an array');
        }

        // Filter CVEs by imageId
        let cves = imageCVEData.filter(cve => cve.imageId === inputs.imageId);

        // If imageVersionId is provided, filter by it
        if (inputs.imageVersionId) {
            this.logger.log(`Filtering CVEs by image version ID: ${inputs.imageVersionId}`);
            cves = cves.filter(cve => cve.imageVersionId === inputs.imageVersionId);
        }

        // If packageId is provided, filter by it
        if (inputs.packageId) {
            this.logger.log(`Filtering CVEs by package ID: ${inputs.packageId}`);
            cves = cves.filter(cve => cve.packages?.some(pkg => pkg.id === inputs.packageId));
        }

        // Implement pagination if page and limit are provided
        if (inputs.page !== undefined && inputs.limit !== undefined) {
            const startIndex = (inputs.page - 1) * inputs.limit;
            const endIndex = startIndex + inputs.limit;
            return cves.slice(startIndex, endIndex);
        }

        return cves;
    }

    /**
     * Retrieves a specific CVE by its ID.
     * @param cveId - The ID of the CVE to retrieve.
     * @returns A promise that resolves to the CVE data.
     */
    public async getImageCVE(cveId: string): Promise<any> {
        this.logger.log(`Getting CVE by ID: ${cveId}`);
        const cve = imageCVEData.find(cve => cve.id === cveId);

        if (!cve) {
            this.logger.error(`CVE with ID ${cveId} not found`);
            throw new Error(`CVE with ID ${cveId} not found`);
        }

        // Return the data property from the response
        return cve;
    }

    /**
     * Retrieves CVEs for a specific image version by its version id.
     * @param imageVersionId - The id of the image version to retrieve CVEs for.
     * @returns A promise that resolves to an array of CVEs for the specified image.
     */
    public async getImageCVEByImageVersionId(imageVersionId: string): Promise<any[]> {
        this.logger.log(`Getting CVEs for image version ID: ${imageVersionId}`);
        if (!imageCVEData || !Array.isArray(imageCVEData)) {
            this.logger.error('Image CVE data is not available or is not an array');
            throw new Error('Image CVE data is not available or is not an array');
        }
        const cves = imageCVEData.filter(cve => cve.imageVersionId === imageVersionId);
        return cves;
    }


    // Package methods

    /**
     * Retrieves packages for a specific image version by its version id.
     * @param imageVersionId - The id of the image version to retrieve packages for.
     * @returns A promise that resolves to an array of packages for the specified image version.
     */

    public async getPackagesByImageVersionId(imageVersionId: string): Promise<any[]> {
        this.logger.log(`Getting packages for image version ID: ${imageVersionId}`);
        if (!packagesData || !Array.isArray(packagesData)) {
            this.logger.error('Image CVE data is not available or is not an array');
            throw new Error('Image CVE data is not available or is not an array');
        }
        const packages = packagesData.filter(pkg => pkg.imageVersionId === imageVersionId);
        return packages;

    }

}
