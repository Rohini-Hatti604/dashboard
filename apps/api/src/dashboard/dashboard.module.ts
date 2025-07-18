import { Module } from '@nestjs/common';
import { WidgetModule } from 'src/widget/widget.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [WidgetModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule { }
