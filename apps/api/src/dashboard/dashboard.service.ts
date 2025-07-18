import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { IDashboardElement } from '@clean-start-dashboard/shared';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { nullToUndefined } from 'src/common/utils';
import { WidgetService } from 'src/widget/widget.service';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly widgetService: WidgetService,
  ) { }

  public async create(inputs: Prisma.DashboardUncheckedCreateInput) {
    const { dashboardCategoryId, parentId, ...rest } = inputs;
    this.logger.verbose(`--> dashboard creation started`);
    const dashboard = await this.prismaService.dashboard.create({
      data: {
        ...rest,
        ...(dashboardCategoryId
          ? {
            dashboardCategory: {
              connect: { id: dashboardCategoryId },
            },

          }
          : {}),
        ...(parentId
          ? {
            parent: {
              connect: { id: parentId },
            },
          }
          : {}),
      },
    });
    this.logger.verbose(`--> dashboard created`);
    return dashboard;
  }

  public async clone(inputs: Prisma.DashboardUncheckedUpdateInput, id: string) {
    this.logger.verbose(`--> dashboard updating started`);
    const dashboard = await this.prismaService.dashboard.findUnique({
      where: { id },
    });
    if (dashboard?.id) {
      const { id: dashboardId, ...rest } = dashboard;
      this.logger.verbose(`--> dashboard ${dashboardId} details fetched`);
      const clonedDashboard = await this.prismaService.dashboard.create({
        data: {
          ...rest,
          name: inputs.name as string,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
      this.logger.verbose(`--> dashboard cloned`);
      return clonedDashboard;
    } else {
      throw new NotFoundException('Dashboard not found');
    }
  }

  public async update(
    inputs: Prisma.DashboardUncheckedUpdateInput,
    id: string,
  ) {
    this.logger.verbose(`--> dashboard updating started`);
    const dashboard = await this.prismaService.dashboard.update({
      data: inputs,
      where: { id },
    });
    this.logger.verbose(`--> dashboard updated`);
    return dashboard;
  }

  public async list(query?: any) {
    this.logger.verbose(`--> dashboard list started`);
    const total = await this.prismaService.dashboard.count({
      where: query.where,
    });
    const dashboards = await this.prismaService.dashboard.findMany({
      ...query,
      where: {
        ...query.where,
        parentId: {
          isSet: false,  // Keep this to only show parent dashboards in manage view
        },
      },
      include: {
        dashboardCategory: true,
        children: true,
      },
    });
    this.logger.verbose(`--> dashboard fetched`);
    return {
      total: total,
      items: dashboards.map((dashboard) => nullToUndefined(dashboard)),
    };
  }

  public async listAll(query?: any) {
    this.logger.verbose(`--> dashboard list started`);
    const total = await this.prismaService.dashboard.count({
      where: query.where,
    });
    const dashboards = await this.prismaService.dashboard.findMany({
      ...query,
      where: {
        ...query.where,
      },
      include: {
        dashboardCategory: true,
        children: true,
      },
    });
    this.logger.verbose(`--> dashboard fetched`);
    return {
      total: total,
      items: dashboards.map((dashboard) => nullToUndefined(dashboard)),
    };
  }


  public async getById(id: string) {
    this.logger.verbose(`--> dashboard by id started`);
    const dashboard = await this.prismaService.dashboard.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
      },
    });
    this.logger.verbose(`--> dashboard fetched`);
    this.logger.verbose(`--> Populating widgets`);
    const elements = await this.populateWidget(dashboard?.elements ?? []);

    return { ...dashboard, elements };
  }

  public async delete(id: string) {
    this.logger.verbose(`--> dashboard deletion started`);
    const dashboard = await this.prismaService.dashboard.delete({
      where: {
        id,
      },
    });
    this.logger.verbose(`--> dashboard deleted`);

    return dashboard;
  }

  //Private Functions

  private async populateWidget(elements: IDashboardElement[]) {
    if (elements.length) {
      const widgets = await this.widgetService.list({});
      const populatedElements = await Promise.all(
        elements.map((el) => ({
          ...el,
          widget: widgets.items?.find((w) => w.id === el.widgetId),
        })),
      );

      return populatedElements;
    } else {
      return elements;
    }
  }
}
