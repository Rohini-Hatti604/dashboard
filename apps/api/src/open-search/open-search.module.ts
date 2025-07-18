import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpensearchModule } from 'nestjs-opensearch';
import { CachingModule } from 'src/caching/caching.module';
import { DashboardProfileModule } from 'src/dashboard-profile/dashboard-profile.module';
import { OpenSearchController } from './open-search.controller';
import { OpenSearchService } from './open-search.service';
import { OpenSearchClientProvider } from './opensearch-client.provider';

@Module({
  imports: [
    // original OpenSearch module for backward compatibility
    OpensearchModule.forRootAsync({
      clientName: 'eventus',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService) => ({
        node: configService.get('OPENSEARCH_NODE'),
        auth: {
          username: configService.get('OPENSEARCH_USERNAME'),
          password: configService.get('OPENSEARCH_PASSWORD'),
        },
        ssl: {
          // ca: readFileSync(configService.get('OPENSEARCH_CA_PATH')),
          // You can turn off certificate verification (rejectUnauthorized: false) if you're using
          // self-signed certificates with a hostname mismatch.
          // cert: fs.readFileSync(client_cert_path),
          // key: fs.readFileSync(client_key_path)
          rejectUnauthorized: configService.get(
            'OPENSEARCH_REJECT_UNAUTHORIZED',
            false,
          ),
        },
        pool: {
          min: configService.get('OPENSEARCH_POOL_MIN', 8),
          max: configService.get('OPENSEARCH_POOL_MAX', 25),
          maxRetries: configService.get('OPENSEARCH_POOL_MAX_RETRIES', 5),
          requestTimeout: configService.get(
            'OPENSEARCH_REQUEST_TIMEOUT',
            1000000000,
          ),
        },
      }),
    }),
    ConfigModule,
    CachingModule,
    DashboardProfileModule,
  ],
  providers: [
    OpenSearchClientProvider, 
    OpenSearchService
  ],
  exports: [OpenSearchService],
  controllers: [OpenSearchController],
})
export class OpenSearchModule { }
