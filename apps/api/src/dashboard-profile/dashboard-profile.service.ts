import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DashboardProfileService {
  private readonly logger = new Logger(DashboardProfileService.name);
  constructor(private readonly prismaService: PrismaService) { }


  public async create(inputs: Prisma.DashboardProfileUncheckedCreateInput) {
    this.logger.verbose(`--> Profile creation started`);
    const profile = await this.prismaService.dashboardProfile.create({
      data: {
        ...inputs,
      },
    });
    this.logger.verbose(`--> Profile created`);
    return profile;
  }

  public async getById(id: string) {
    this.logger.verbose(`--> profile by id started`);
    const profile = await this.prismaService.dashboardProfile.findUnique({
      where: {
        id,
      },
    });
    this.logger.verbose(`--> profile fetched`);
    return this.populateFavourites(profile?.favouriteDashboardIds || [], profile);
  }

  public async update(
    inputs: Prisma.DashboardProfileUncheckedUpdateInput,
    id: string,
  ) {
    this.logger.verbose(`--> Dashboard profile updating started`);
    const dashboardProfile = await this.prismaService.dashboardProfile.update({
      data: inputs,
      where: { id },
    });
    this.logger.verbose(`--> Dashboard profile updated`);
    return dashboardProfile;
  }

  private async populateFavourites(ids: string[], profile) {
    this.logger.verbose(`--> Populating favourites started`);
    const dashboards = await this.prismaService.dashboard.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    this.logger.verbose(`--> Populating favourites completed`);
    return { ...profile, favouriteDashboards: dashboards };
  }
}
