import { Module } from '@nestjs/common';
import { DashboardProfileController } from './dashboard-profile.controller';
import { DashboardProfileService } from './dashboard-profile.service';

@Module({
  providers: [DashboardProfileService],
  controllers: [DashboardProfileController],
  exports: [DashboardProfileService],
})
export class DashboardProfileModule { }
