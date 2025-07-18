import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { IGetImageByIdRequest, IGetImageByNameRequest, IListImageCVERequest, IListImageRequest, IListImageVersionRequest } from './dto/image.dto';
import { ImageService } from './image.service';

@Controller('image')
// @UseGuards(RolesGuard)
// @UseGuards(AuthGuard)
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    // Image endpoints

    @TypedRoute.Post('list')
    // @Permissions(['image.list'])
    public async list(
        @TypedBody() inputs: IListImageRequest
        // @User() user: any,
    ): Promise<any[]> {
        return await this.imageService.listImage(inputs);
    }

    @TypedRoute.Post('get')
    // @Permissions(['image.get'])
    public async get(
        @TypedBody() inputs: IGetImageByIdRequest,
        // @User() user: any,
    ): Promise<any> {
        return await this.imageService.getImage(inputs.id);
    }

    @TypedRoute.Post('get/by-name')
    // @Permissions(['image.get'])
    public async getbyName(
        @TypedBody() inputs: IGetImageByNameRequest,
        // @User() user: any,
    ): Promise<any> {
        return await this.imageService.getImageByName(inputs.name);
    }

    // Image version endpoints
    @TypedRoute.Post('version/list')
    // @Permissions(['image.version.list'])
    public async listVersion(
        @TypedBody() inputs: IListImageVersionRequest
        // @User() user: any,
    ): Promise<any[]> {
        return await this.imageService.listImageVersion(inputs);
    }

    @TypedRoute.Post('version/get')
    // @Permissions(['image.version.get'])
    public async getVersion(
        @TypedBody() inputs: { id: string },
        // @User() user: any,
    ): Promise<any> {
        return await this.imageService.getImageVersionById(inputs.id);
    }

    // Get packages by image version ID
    @TypedRoute.Post('version/packages')
    // @Permissions(['image.version.packages'])
    public async getPackagesByImageVersionId(
        @TypedBody() inputs: { imageVersionId: string }
        // @User() user: any,
    ): Promise<any[]> {
        return await this.imageService.getPackagesByImageVersionId(inputs.imageVersionId);
    }

    // Image category endpoints

    // get image categories
    @TypedRoute.Post('category/list')
    // @Permissions(['image.category.list'])
    public async listCategory(
        // @User() user: any,
    ): Promise<any[]> {
        return await this.imageService.listImageCategory();
    }

    // get image category by id
    @TypedRoute.Post('category/get')
    // @Permissions(['image.category.get'])
    public async getCategory(
        @TypedBody() inputs: IGetImageByIdRequest,
        // @User() user: any,
    ): Promise<any> {
        return await this.imageService.getImageCategory(inputs.id);
    }

    // Image CVE endpoints

    @TypedRoute.Post('cve/list')
    // @Permissions(['image.cve.list'])
    public async listCVE(
        @TypedBody() inputs: IListImageCVERequest
        // @User() user: any,
    ): Promise<any[]> {
        return await this.imageService.listImageCVE(inputs);
    }

    @TypedRoute.Post('cve/get')
    // @Permissions(['image.cve.get'])
    public async getCVE(
        @TypedBody() inputs: IGetImageByIdRequest,
        // @User() user: any,
    ): Promise<any> {
        return await this.imageService.getImageCVE(inputs.id);
    }



}
