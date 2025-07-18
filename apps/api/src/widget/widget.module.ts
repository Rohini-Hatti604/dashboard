import { Module } from '@nestjs/common';
import { OpenSearchModule } from 'src/open-search/open-search.module';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
  imports: [OpenSearchModule],
  controllers: [WidgetController],
  providers: [WidgetService],
  exports: [WidgetService],
})
export class WidgetModule { }
