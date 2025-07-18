import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcService } from './grpc/grpc.service';
import { OpenSearchService } from './open-search/open-search.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private searchService: OpenSearchService,
    private grpcService: GrpcService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @TypedRoute.Post('get-user-details')
  getUserDetails(@TypedBody() data: { session_id: string }): any {
    return this.grpcService.getUserDetails(data.session_id);
  }

  // @TypedRoute.Post('add-search-data')
  // addSearchData(@TypedBody() data: any): any {
  //   return this.searchService.singleDataIngestion(data);
  // }

  @TypedRoute.Post('query-search-data')
  querySearchData(@TypedBody() data: any): any {
    return this.searchService.searchByQuery(data);
  }
}
