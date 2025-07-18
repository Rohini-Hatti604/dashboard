import { PrismaClient } from '.prisma/client';
import { IDashboardCategory } from '@clean-start-dashboard/shared';
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { IListEntitiesRequest, IListEntitiesResponse } from 'src/common/dtos';
import { listRequestToFindManyArgs } from 'src/common/utils';
import { Permissions } from 'src/decorators/permission.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/permissions.guard';
import { DashboardCategoryService } from './dashboard-category.service';
import {
  ICreateDashboardCategoryRequest,
  IGetDashboardCategoryRequest,
} from './dto/dashboard-category.dto';

@Controller('dashboard-category')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class DashboardCategoryController {
  constructor(
    private readonly dashboardCategoryService: DashboardCategoryService,
  ) { }

  @Permissions(['category.create'])
  @TypedRoute.Post('create')
  public async create(
    @TypedBody() inputs: ICreateDashboardCategoryRequest,
  ): Promise<IDashboardCategory> {
    return await this.dashboardCategoryService.create({
      ...inputs,
    });
  }

  @Permissions(['category.view'])
  @TypedRoute.Post('list')
  public async list(
    @TypedBody() inputs: IListEntitiesRequest<IDashboardCategory>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<IDashboardCategory>> {
    const params = listRequestToFindManyArgs<
      PrismaClient['dashboardCategory'],
      IDashboardCategory
    >(inputs, ['name']);
    return await this.dashboardCategoryService.list(user, params ?? {});
  }

  @Permissions(['category.view'])
  @TypedRoute.Get('get')
  public async get(
    @User() user: any,
    @TypedQuery() query: IGetDashboardCategoryRequest,
  ): Promise<IDashboardCategory | null> {
    return await this.dashboardCategoryService.getById(query.id, user);
  }
}
