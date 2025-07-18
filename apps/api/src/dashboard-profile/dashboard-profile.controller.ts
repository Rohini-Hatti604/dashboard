import { IDashboardProfile } from '@clean-start-dashboard/shared';
import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { DashboardProfileService } from './dashboard-profile.service';
import {
  IAddToFavouriteRequest,
  ISetDefaultDashbordRequest,
} from './dto/dashboard-profile.dto';

@Controller('dashboard-profile')
@UseGuards(AuthGuard)
export class DashboardProfileController {
  constructor(
    private readonly dashboardProfileService: DashboardProfileService,
  ) { }

  @TypedRoute.Get('get')
  public async get(@User() user: any): Promise<IDashboardProfile | any> {
    const profile = await this.dashboardProfileService.getById(
      user?.user_data?.id,
    );

    if (profile?.id) {
      return { ...profile, user };
    } else {
      const created = await this.dashboardProfileService.create({
        id: user?.user_data?.id,
        favouriteDashboardIds: [], // Initialize with empty array
      });

      return { ...created, user };
    }
  }

  @TypedRoute.Post('set-default-dashboard')
  public async setDefaultDashboard(
    @TypedBody() inputs: ISetDefaultDashbordRequest,
    @User() user: any,
  ): Promise<IDashboardProfile | any> {
    return await this.dashboardProfileService.update(
      { defaultDashboardId: inputs.dashboardId },
      user?.user_data?.id,
    );
  }

  @TypedRoute.Post('favourite/add')
  public async addToFavourite(
    @TypedBody() inputs: IAddToFavouriteRequest,
    @User() user: any,
  ): Promise<IDashboardProfile | any> {
    const profile = await this.dashboardProfileService.getById(
      user?.user_data?.id,
    );

    // Initialize with empty array if not exists
    const currentFavorites = profile?.favouriteDashboardIds || [];

    // Only add if not already in favorites
    if (!currentFavorites.includes(inputs.dashboardId)) {
      return await this.dashboardProfileService.update(
        { favouriteDashboardIds: [...currentFavorites, inputs.dashboardId] },
        user?.user_data?.id,
      );
    }

    return profile;
  }

  @TypedRoute.Post('favourite/remove')
  public async removeFromFavourite(
    @TypedBody() inputs: IAddToFavouriteRequest,
    @User() user: any,
  ): Promise<IDashboardProfile | any> {
    const profile = await this.dashboardProfileService.getById(
      user?.user_data?.id,
    );

    // Initialize with empty array if not exists
    const currentFavorites = profile?.favouriteDashboardIds || [];

    // Remove the dashboard ID from favorites
    const newFavorites = currentFavorites.filter(id => id !== inputs.dashboardId);

    return await this.dashboardProfileService.update(
      { favouriteDashboardIds: newFavorites },
      user?.user_data?.id,
    );
  }
}
