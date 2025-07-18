import { Module } from '@nestjs/common';
import { OpenSearchModule } from 'src/open-search/open-search.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [OpenSearchModule],
  providers: [ImageService],
  controllers: [ImageController],

})
export class ImageModule { }
