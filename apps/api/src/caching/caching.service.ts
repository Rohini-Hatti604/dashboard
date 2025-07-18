import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  private readonly logger = new Logger(CachingService.name);
  public constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCacheByQuery(query: any): Promise<any> {
    const { default: bencode } = await import('bencode');
    this.logger.log(`Getting data from redis cache`);
    const encodedKey = bencode.encode(query).toString().replace(' ', '');
    this.logger.log(`Getting data from redis cache for ${encodedKey}`);
    const value = await this.cacheManager.get(encodedKey);
    if (value) {
      this.logger.log(`Returning data from redis cache`);

      return JSON.parse(value as string);
    } else {
      this.logger.log(`Data not available in cache`);
      return null;
    }
  }

  async setCacheByQuery(query: any, data: any): Promise<any> {
    const { default: bencode } = await import('bencode');
    this.logger.log(`Saving data to redis cache`);
    const encodedKey = bencode.encode(query).toString().replace(' ', '');
    this.logger.log(`Stringifying data`);
    const stringifiedData = JSON.stringify(data);
    this.logger.log(`Data stringified`);
    this.logger.log(`Data Saving to redis cache`);
    return this.cacheManager.set(encodedKey, stringifiedData);
  }
}
