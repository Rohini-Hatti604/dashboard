import { PrismaClient } from '@clean-start-dashboard/database';
import { IUserVariable } from '@clean-start-dashboard/shared';
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, NotAcceptableException, UseGuards } from '@nestjs/common';
import { IListEntitiesRequest, IListEntitiesResponse } from 'src/common/dtos';
import { listRequestToFindManyArgs } from 'src/common/utils';
import { Permissions } from 'src/decorators/permission.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/permissions.guard';
import {
  ICreateUserVariableRequest,
  IGetUserVariableRequest,
  IUpdateUserVariableRequest,
} from './dto/user-variable.dto';
import { UserVariableService } from './user-variable.service';

@Controller('user-variable')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class UserVariableController {
  constructor(private readonly userVariableService: UserVariableService) { }

  @Permissions(['variable.create'])
  @TypedRoute.Post('create')
  public async create(
    @TypedBody() inputs: ICreateUserVariableRequest,
    @User() user: any,
  ): Promise<IUserVariable> {
    const isAvailable = await this.userVariableService.getByUserIdAndQuery(
      user?.user_data?.id,
      {
        key: inputs.key,
        type: inputs.type,
        ...(inputs.dashboardId ? { dashboardId: inputs.dashboardId } : {}),
      },
    );
    if (isAvailable) {
      throw new NotAcceptableException('Key already exists');
    }

    return await this.userVariableService.create({
      ...inputs,

      isPublic: false,
      ownerId: user?.user_data?.id,
      organizationId: user?.user_data?.id,
    });
  }

  // Get the user variable by id
  @Permissions(['variable.view'])
  @TypedRoute.Get('get')
  public async get(@TypedQuery() query: IGetUserVariableRequest): Promise<any> {
    return await this.userVariableService.getById(query.id);
  }

  // List all the variables available to the user
  @Permissions(['variable.view'])
  @TypedRoute.Post('list')
  public async list(
    @TypedBody() inputs: IListEntitiesRequest<IUserVariable>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<IUserVariable>> {
    const params = listRequestToFindManyArgs<
      PrismaClient['userVariable'],
      IUserVariable
    >(inputs, ['key']);



    return await this.userVariableService.list(
      params
        ? {
          ...params,
          where: {
            ...(params?.where ?? {}),
            AND: [
              ...((params?.where?.AND as any[]) ?? []),
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
            AND: [
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
        },
    );
  }

  // Update the user variable
  @Permissions(['variable.modify'])
  @TypedRoute.Post('update')
  public async update(
    @TypedBody() inputs: IUpdateUserVariableRequest,
  ): Promise<IUserVariable | any> {
    const { id, ...variableDetails } = inputs;
    return await this.userVariableService.update(
      { ...(variableDetails as any) },
      id,
    );
  }

  // Delete the user variable
  @Permissions(['variable.delete'])
  @TypedRoute.Delete('delete')
  public async delete(
    @TypedBody() inputs: { id: string },
  ): Promise<IUserVariable | any> {
    return await this.userVariableService.delete(inputs.id);
  }
}
