import { TypedBody, TypedRoute } from '@nestia/core';
import { Controller, UseGuards } from '@nestjs/common';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { IGetQueryDataFilter } from 'src/widget/dto/widget.dto';
import { OpenSearchService } from './open-search.service';
import { OpenSearchClientProvider } from './opensearch-client.provider';

dayjs.extend(utc)
dayjs.extend(timezone)


@Controller('open-search')
@UseGuards(AuthGuard)
export class OpenSearchController {
  constructor(private searchService: OpenSearchService, private readonly opensearchClientProvider: OpenSearchClientProvider,) { }

  @TypedRoute.Post('search')
  public async search(
    @TypedBody() query: IGetQueryDataFilter,
    @User() user: any,
  ): Promise<any> {
    const timeBounds = {
      min: new Date(dayjs(query.timeBounds.min).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
      max: new Date(dayjs(query.timeBounds.max).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
    };

    const params = [
      {
        index: this.opensearchClientProvider.getLogIndex(user?.user_data?.id) ?? '',
      },
      {
        query: {
          bool: {
            filter: [
              // ...(query.queryJson ? query.queryJson?.bool?.filter : []),
              {
                range: {
                  '@timestamp': {
                    gte: timeBounds.min,
                    lte: timeBounds.max,
                    format: 'epoch_millis',
                  },
                },
              },
              {
                query_string: {
                  analyze_wildcard: true,
                  query: query.query,
                },
              },
              {
                query_string: {
                  analyze_wildcard: true,
                  query: 'data.tenant:' + user?.user_data.tenant.tenant_code,
                },
              },
            ],
            ...(query.queryJson ? query.queryJson.bool : {}),
          },
        },
        aggs: query.aggs ?? {},
        size: query.size ?? 100,
      },
    ];

    // console.log(JSON.stringify(params));

    return await this.searchService.aggregateQuery(params, user?.user_data?.id);
  }

  @TypedRoute.Post('alerts')
  public async alerts(
    @TypedBody() query: IGetQueryDataFilter,
    @User() user: any,
  ): Promise<any> {
    const timeBounds = {
      min: new Date(dayjs(query.timeBounds.min).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
      max: new Date(dayjs(query.timeBounds.max).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
    };

    const params = [
      {
        index: this.opensearchClientProvider.getAlertIndex(user?.user_data?.id) ?? '',
      },
      {
        query: {
          bool: {
            filter: [
              // ...(query.queryJson ? query.queryJson?.bool?.filter : []),
              {
                range: {
                  '@timestamp': {
                    gte: timeBounds.min,
                    lte: timeBounds.max,
                    format: 'epoch_millis',
                  },
                },
              },
              {
                query_string: {
                  analyze_wildcard: true,
                  query: query.query,
                },
              },
              {
                query_string: {
                  analyze_wildcard: true,
                  query: 'data.tenant:' + user?.user_data.tenant.tenant_code,
                },
              },
            ],
            ...(query.queryJson ? query.queryJson.bool : {}),
          },
        },
        aggs: query.aggs ?? {},
        size: query.size ?? 100,
      },
    ];

    // console.log(JSON.stringify(params));

    return await this.searchService.aggregateQuery(params, user?.user_data?.id);
  }

  @TypedRoute.Post('process-tree')
  public async processTree(
    @TypedBody() query: IGetQueryDataFilter,
    @User() user: any,
  ): Promise<any> {
    const timeBounds = {
      min: new Date(dayjs(query.timeBounds.min).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
      max: new Date(dayjs(query.timeBounds.max).tz(query.timeBounds.timezone ?? "Asia/Calcutta").toDate()).getTime(),
    };
    console.log('Time Bounds', user);

    const params = [
      {
        index: '',
      },
      {
        query: {
          bool: {
            filter: [
              // ...(query.queryJson ? query.queryJson?.bool?.filter : []),
              {
                range: {
                  '@timestamp': {
                    gte: timeBounds.min,
                    lte: timeBounds.max,
                    format: 'epoch_millis',
                  },
                },
              },
              {
                query_string: {
                  analyze_wildcard: true,
                  query: query.query,
                },
              },
              // {
              //   query_string: {
              //     analyze_wildcard: true,
              //     query: 'data.tenant:' + user?.user_data.tenant.tenant_code,
              //   },
              // },
            ],
            ...(query.queryJson ? query.queryJson.bool : {}),
          },
        },
        aggs: query.aggs ?? {},
        size: query.size ?? 100,
      },
    ];

    // console.log(JSON.stringify(params));

    return await this.searchService.aggregateQuery(params, user?.user_data?.id);
  }

  @TypedRoute.Post('get-field-values')
  public async getFieldValues(
    @TypedBody() query: { field: string },
    @User() user: any,
  ): Promise<any> {
    const params = [
      {
        index: 'esdl-alerts*',
      },
      {
        aggs: {
          values: {
            terms: { field: query.field, size: 100 },
          },
        },

        size: 0,
      },
    ];
    const data = await this.searchService.aggregateQuery(params, user?.user_data?.id);
    return data?.body?.responses[0]?.aggregations;
    if (data.statusCode === 200) {
      return data?.body?.responses[0]?.aggregations?.values?.buckets ?? [];
    } else {
      throw new Error(JSON.stringify(data));
    }
  }

  @TypedRoute.Post('get-fields')
  public async getFields(@User() user: any): Promise<any> {
    const data = await this.searchService.getFields(user?.user_data?.id);

    // if (data.statusCode === 200) {
    //   return data?.body?.responses[0]?.aggregations?.values?.buckets ?? [];
    // } else {
    //   throw new Error(JSON.stringify(data));
    // }

    // console.log(data);

    return data;
  }
}
