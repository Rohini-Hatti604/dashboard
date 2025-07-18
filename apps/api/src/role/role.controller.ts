import { PrismaClient } from '@clean-start-dashboard/database';
import { IRole } from '@clean-start-dashboard/shared';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { IListEntitiesRequest, IListEntitiesResponse } from 'src/common/dtos';
import { listRequestToFindManyArgs } from 'src/common/utils';
import { ICreateRoleRequest, IUpdateRoleRequest } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) { }

    // Create
    @TypedRoute.Post('create')
    public async create(
        @TypedBody() inputs: ICreateRoleRequest,
    ): Promise<IRole> {
        return await this.roleService.create({
            ...inputs,
        });
    }

    // Update
    @TypedRoute.Post('update')
    public async update(
        @TypedBody() inputs: IUpdateRoleRequest,
    ): Promise<IRole> {
        const { id, ...roleDetails } = inputs;
        return await this.roleService.update({ ...roleDetails }, id);
    }

    // List
    @TypedRoute.Post('list')
    public async list(
        @TypedBody() inputs: IListEntitiesRequest<IRole>,
    ): Promise<IListEntitiesResponse<IRole> | any> {
        const params = listRequestToFindManyArgs<
            PrismaClient['role'],
            IRole
        >(inputs, ['name']);
        return await this.roleService.list(params ?? {});
    }
}
