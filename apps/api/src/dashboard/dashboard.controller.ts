import { PrismaClient } from '.prisma/client';
import { IDashboard } from '@clean-start-dashboard/shared';
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { IListEntitiesRequest, IListEntitiesResponse } from 'src/common/dtos';
import { listRequestToFindManyArgs } from 'src/common/utils';
import { Permissions } from 'src/decorators/permission.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/permissions.guard';
import { DashboardService } from './dashboard.service';
import {
  ICreateDashboardRequest,
  IGetDashboardRequest,
  IUpdateDashboardRequest,
} from './dto/dashboard.dto';

@Controller('dashboard')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @TypedRoute.Post('create')
  @Permissions(['dashboard.create'])
  public async create(
    @TypedBody() inputs: ICreateDashboardRequest,
    @User() user: any,
  ): Promise<IDashboard> {
    return await this.dashboardService.create({
      ...inputs,
      ownerId: user?.user_data?.id,
      isPublic: false,
    });
  }

  @TypedRoute.Post('list')
  @Permissions(['dashboard.view'])
  public async list(
    @TypedBody() inputs: IListEntitiesRequest<IDashboard>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<IDashboard>> {
    const params = listRequestToFindManyArgs<
      PrismaClient['dashboard'],
      IDashboard
    >(inputs, ['name']);

    return await this.dashboardService.list(
      params
        ? {
          ...params,
          where: {
            ...params.where,
            AND: [
              ...((params.where?.AND as any[]) ?? []),
              {
                OR: [
                  {
                    ownerId: user?.user_data?.id,
                  },
                  {
                    isPublic: true,
                  },
                ],
              },
            ],
          },
        }
        : {
          where: {
            OR: [
              {
                ownerId: user?.user_data?.id,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
    );
  }

  @TypedRoute.Post('list-all')
  @Permissions(['dashboard.view'])
  public async listAll(
    @TypedBody() inputs: IListEntitiesRequest<IDashboard>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<IDashboard>> {
    const params = listRequestToFindManyArgs<
      PrismaClient['dashboard'],
      IDashboard
    >(inputs, ['name']);

    return await this.dashboardService.listAll(
      params
        ? {
          ...params,
          where: {
            ...params.where,
            AND: [
              ...((params.where?.AND as any[]) ?? []),
              {
                OR: [
                  {
                    ownerId: user?.user_data?.id,
                  },
                  {
                    isPublic: true,
                  },
                ],
              },
            ],
          },
        }
        : {
          where: {
            OR: [
              {
                ownerId: user?.user_data?.id,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
    );
  }

  @TypedRoute.Post('list/threat-intel')
  @Permissions(['dashboard.view'])
  public async listThreatIntel(
    @TypedBody() inputs: IListEntitiesRequest<IDashboard>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<IDashboard>> {
    const params = listRequestToFindManyArgs<
      PrismaClient['dashboard'],
      IDashboard
    >(inputs, ['name']);

    return await this.dashboardService.list(
      params
        ? {
          ...params,
          where: {
            ...params.where,
            dashboardCategory: {
              is: {
                name: "Threat Intelligence"
              }
            },
            AND: [
              ...((params.where?.AND as any[]) ?? []),

              {
                OR: [
                  {
                    ownerId: user?.user_data?.id,
                  },
                  {
                    isPublic: true,
                  },
                ],
              },
            ],
          },
        }
        : {
          where: {
            OR: [
              {
                ownerId: user?.user_data?.id,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
    );
  }

  @TypedRoute.Get('get')
  @Permissions(['dashboard.view'])
  public async get(@TypedQuery() query: IGetDashboardRequest): Promise<any> {
    return await this.dashboardService.getById(query.id);
  }

  @TypedRoute.Post('update')
  @Permissions(['dashboard.modify'])
  public async update(
    @TypedBody() inputs: IUpdateDashboardRequest,
  ): Promise<IDashboard> {
    const { id, ...dashboardDetails } = inputs;
    return await this.dashboardService.update({ ...dashboardDetails }, id);
  }

  @TypedRoute.Post('clone')
  @Permissions(['dashboard.create'])
  public async clone(
    @TypedBody() inputs: IUpdateDashboardRequest,
  ): Promise<IDashboard> {
    const { id, ...dashboardDetails } = inputs;
    return await this.dashboardService.clone(
      { ...dashboardDetails, isPublic: false },
      id,
    );
  }

  @TypedRoute.Delete('delete')
  @Permissions(['dashboard.delete'])
  public async delete(@TypedQuery() query: IGetDashboardRequest): Promise<any> {
    return await this.dashboardService.delete(query.id);
  }
}
