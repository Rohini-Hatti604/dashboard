import { PrismaClient } from '.prisma/client';
import { IWidget } from '@clean-start-dashboard/shared';
import { TypedBody, TypedQuery, TypedRoute } from '@nestia/core';
import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IListEntitiesRequest, IListEntitiesResponse } from 'src/common/dtos';
import { listRequestToFindManyArgs } from 'src/common/utils';
import { Permissions } from 'src/decorators/permission.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/permissions.guard';
import { User } from '../decorators/user.decorator';
import {
  ICreateWidgetRequest,
  IGetQueryDataRequest,
  IGetWidgetRequest,
  IUpdateWidgetRequest,
} from './dto/widget.dto';
import { WidgetService } from './widget.service';

@Controller('widget')
@UseGuards(RolesGuard) // comment if you dont want to use roles guard
@UseGuards(AuthGuard)
export class WidgetController {
  constructor(private readonly widgetService: WidgetService, private configService: ConfigService) { }

  @Permissions(['widget.create'])
  @TypedRoute.Post('create')
  public async create(
    @TypedBody() inputs: ICreateWidgetRequest,
  ): Promise<IWidget | any> {
    const { access_token, ...widgetDetails } = inputs;

    if (access_token === this.configService.get('WIDGET_ACCESS_TOKEN')) {
      return await this.widgetService.create({
        ...(widgetDetails as any),
      });

    } else {
      throw new UnauthorizedException('Invalid access token');
    }

  }

  @Permissions(['widget.view'])
  @TypedRoute.Post('list')
  public async list(
    @TypedBody() inputs: IListEntitiesRequest<IWidget>,
    @User() user: any,
  ): Promise<IListEntitiesResponse<any>> {
    const params = listRequestToFindManyArgs<PrismaClient['widget'], IWidget>(
      inputs,
      ['title', 'tags'],
    );

    console.log(user);

    return await this.widgetService.list(params ?? {});
  }

  @Permissions(['widget.view'])
  @TypedRoute.Get('get')
  public async get(
    @TypedQuery() query: IGetWidgetRequest,
  ): Promise<IWidget | any> {
    return await this.widgetService.getById(query.id);
  }

  @Permissions(['widget.modify'])
  @TypedRoute.Post('update')
  public async update(
    @TypedBody() inputs: IUpdateWidgetRequest,
  ): Promise<IWidget | any> {
    const { id, access_token, ...widgetDetails } = inputs;

    console.log(access_token);


    // if (access_token === this.configService.get('WIDGET_ACCESS_TOKEN')) {
    //   return await this.widgetService.update({ ...(widgetDetails as any) }, id);

    // } else {
    //   throw new UnauthorizedException('Invalid access token');
    // }

    return await this.widgetService.update({ ...(widgetDetails as any) }, id);

  }

  @TypedRoute.Post('aggregate')
  public async aggregate(
    @TypedBody() query: IGetQueryDataRequest,
    @User() user: any,
  ): Promise<any> {
    return await this.widgetService.aggregate(query, user?.user_data?.id);
  }
}
