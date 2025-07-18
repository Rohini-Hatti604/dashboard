import { Module } from '@nestjs/common';
import { DashboardCategoryController } from './dashboard-category.controller';
import { DashboardCategoryService } from './dashboard-category.service';

@Module({

  providers: [DashboardCategoryService],
  controllers: [DashboardCategoryController],
})
export class DashboardCategoryModule { }
