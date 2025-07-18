import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { Injectable, Logger } from '@nestjs/common';
import { nullToUndefined } from 'src/common/utils';

@Injectable()
export class DashboardCategoryService {
  private readonly logger = new Logger(DashboardCategoryService.name);
  constructor(private readonly prismaService: PrismaService) { }

  public async create(inputs: Prisma.DashboardCategoryCreateInput) {
    this.logger.verbose(`--> dashboard category creation started`);
    const dashboardCategory = await this.prismaService.dashboardCategory.create(
      {
        data: inputs,
      },
    );
    this.logger.verbose(`--> dashboard category created`);
    return dashboardCategory;
  }

  public async list(user: any, query?: any) {
    this.logger.verbose(`--> dashboard categories list started`);

    const total = await this.prismaService.dashboardCategory.count({
      where: query.where,
    });
    const dashboardCategory =
      await this.prismaService.dashboardCategory.findMany({
        ...query,
        where: {
          ...query.where,
        },
        include: {
          dashboards: {
            where: {
              OR: [
                {
                  ownerId: user?.user_data?.id,
                },
                {
                  isPublic: true,
                },
                {
                  parentId: {
                    isSet: false
                  }
                }
              ],
            },
          },
        },
      });
    this.logger.verbose(`--> dashboard categories fetched`);
    return {
      total: total,
      items: dashboardCategory.map((dashboard) => nullToUndefined(dashboard)),
    };
  }

  public async getById(id: string, user: any) {
    this.logger.verbose(`--> dashboard category by id started`);
    const dashboardCategory =
      await this.prismaService.dashboardCategory.findUnique({
        where: {
          id,
        },
        include: {
          dashboards: {
            where: {
              OR: [
                {
                  ownerId: user?.user_data?.id,
                },
                {
                  isPublic: true,
                },
                {
                  parentId: {
                    isSet: false
                  }
                }
              ],
            },
          },
        },
      });
    this.logger.verbose(`--> dashboard category fetched`);
    return dashboardCategory;
  }
}
