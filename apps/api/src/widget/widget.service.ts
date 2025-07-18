import { Prisma, PrismaService } from '@clean-start-dashboard/database';
import { IWidgetConfig } from '@clean-start-dashboard/shared';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { nullToUndefined } from 'src/common/utils';
import { OpenSearchService } from 'src/open-search/open-search.service';
import { IAggs, IGetQueryDataRequest } from './dto/widget.dto';


dayjs.extend(utc)
dayjs.extend(timezone)

// eslint-disable-next-line @typescript-eslint/no-empty-object-type

interface Aggregation {
  [key: string]: {
    terms?: {
      field: string;
      size: number;
      order: { [key: string]: string };
      min_doc_count: number;
    };
    date_histogram?: {
      time_zone: string;
      interval: string;
      field: string;
      min_doc_count: number;
      extended_bounds: { min: number; max: number };
      format: string;
    };
    aggs?: Aggregation;
  };
}

@Injectable()
export class WidgetService {
  private readonly logger = new Logger(WidgetService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly searchService: OpenSearchService,
    private readonly configService: ConfigService,
  ) { }

  public async create(inputs: Prisma.WidgetUncheckedCreateInput) {
    const { widgetCategoryId, ...rest } = inputs;
    this.logger.verbose(`--> widget creation started`);
    const widget = await this.prismaService.widget.create({
      data: {
        ...rest,
        ...(typeof widgetCategoryId === 'string'
          ? {
            widgetCategory: {
              connect: { id: widgetCategoryId },
            },
          }
          : {}),
      },
    });
    this.logger.verbose(`--> widget created`);
    return widget;
  }

  public async update(inputs: Prisma.WidgetUncheckedUpdateInput, id: string) {
    this.logger.verbose(`--> widget updating started`);
    const { widgetCategoryId, ...rest } = inputs;
    const widget = await this.prismaService.widget.update({
      data: {
        ...rest,
        ...(typeof widgetCategoryId === 'string'
          ? {
            widgetCategory: {
              connect: { id: widgetCategoryId },
            },
          }
          : {}),
      },
      where: { id },
    });
    this.logger.verbose(`--> widget updated`);
    return widget;
  }

  public async list(query?: any) {
    this.logger.verbose(`--> widget list started`);
    const total = await this.prismaService.widget.count({
      where: query.where,
    });
    const widgets = await this.prismaService.widget.findMany({
      ...query,
      where: {
        ...query.where,
      },
      include: {
        widgetCategory: true,
      },
    });
    this.logger.verbose(`--> widget fetched`);
    // return widgets;
    return {
      total: total,
      items: widgets.map((widget) => nullToUndefined(widget)),
    };
  }

  public async getById(id: string) {
    this.logger.verbose(`--> widget by id started`);
    const widget = await this.prismaService.widget.findUnique({
      where: {
        id,
      },
      include: {
        widgetCategory: true,
      },
    });
    this.logger.verbose(`--> widget fetched`);
    return widget;
  }

  public async aggregate(query: IGetQueryDataRequest, userId?: string) {
    this.logger.verbose(`--> widget get query data started`);
    // console.log(query);

    const timeBounds = {
      min: new Date(query.filters.timeBounds.min).getTime(),
      max: new Date(query.filters.timeBounds.max).getTime(),
      timezone: dayjs(query.filters.timeBounds.min).tz(query.filters.timeBounds.timezone ?? "Asia/Calcutta").format('Z'),
    };

    console.log("timezone", timeBounds.timezone, "min", timeBounds.min, "max", timeBounds.max);


    const aggregations = await Promise.all(
      query.config.map((config) =>
        this.convertToNestedAggs(config, timeBounds, query?.filters?.sort, query.filters),
      ),
    );

    const params: any = [];
    (await aggregations).map((aggregation) => {
      params.push({
        index: this.configService.get('OPENSEARCH_LOG_INDEX') ?? 'esdl-archives*',
      });
      params.push({ ...aggregation });
    });

    const data = this.searchService.aggregateQuery(params, userId);
    this.logger.verbose(`--> widget fetched`);
    // return params;
    return data;
  }

  //Private functions

  private convertToNestedAggs(
    input: IWidgetConfig,
    timeBounds: {
      timezone?: string; min: number; max: number
    },
    sort: { '@timestamp': { order: 'asc'; unmapped_type: 'boolean' } },
    filters?: { queryJson?: any },
  ): any {
    let aggs: IAggs = {};

    if (input.aggregation) {
      aggs = this.updateDateHistogram(
        input.aggregation,
        timeBounds.min,
        timeBounds.max,
        timeBounds.timezone ?? "+05:30",
      );
    }

    return {
      size: input.aggregation ? 0 : 1000,
      query: {
        bool: {
          filter: [
            {
              range: {
                [input.timeField]: {
                  gte: timeBounds.min,
                  lte: timeBounds.max,
                  format: 'epoch_millis',
                },
              },
            },
            {
              query_string: {
                analyze_wildcard: true,
                query: input.query,
              },
            },
          ],
          ...(filters ? filters.queryJson ? filters.queryJson.bool : {} : {}),
        },
      },
      aggs,
      sort: sort,
    };
  }

  updateDateHistogram(
    aggregation: Aggregation,
    newMin: number,
    newMax: number,
    timezone: string,
  ): any {
    const updatedAggregation = { ...aggregation };
    const traverseAndUpdate = (agg: Aggregation) => {
      for (const key in agg) {
        if (agg[key].date_histogram) {
          agg[key].date_histogram.extended_bounds.min = newMin;
          agg[key].date_histogram.extended_bounds.max = newMax;
          agg[key].date_histogram.time_zone = timezone;
        }
        if (agg[key].aggs) {
          traverseAndUpdate(agg[key].aggs);
        }
      }
    };
    traverseAndUpdate(updatedAggregation);
    return updatedAggregation;
  }
}


