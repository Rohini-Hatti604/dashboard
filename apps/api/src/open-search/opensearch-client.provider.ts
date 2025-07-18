import { Injectable, Logger, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';
import { OpensearchClient } from 'nestjs-opensearch';
import { DashboardProfileService } from '../dashboard-profile/dashboard-profile.service';

@Injectable()
export class OpenSearchClientProvider {
  private readonly logger = new Logger(OpenSearchClientProvider.name);

  constructor(
    private readonly configService: ConfigService,
    @Optional() private readonly dashboardProfileService?: DashboardProfileService,
  ) {
    if (!this.dashboardProfileService) {
      this.logger.warn('DashboardProfileService not available - dynamic configuration will not work');
    }
  }

  public async getClient(userId?: string): Promise<OpensearchClient> {
    let nodeUrl: string | undefined;
    let username: string | undefined;
    let password: string | undefined;
    let rejectUnauthorized = false; // Initialize with default value
    const minPoolSize = 8;
    const maxPoolSize = 25;
    const maxRetries = 5;
    const requestTimeout = 1000000000;

    // Try to get configuration from dashboard profile
    if (userId && this.dashboardProfileService) {
      try {
        const profile = await this.dashboardProfileService.getById(userId);
        if (profile?.opensearchConfig) {
          const config = profile.opensearchConfig as Record<string, unknown>;
          nodeUrl = config.nodeUrl as string | undefined;
          username = config.username as string | undefined;
          password = config.password as string | undefined;
          rejectUnauthorized = config.rejectUnauthorized !== undefined
            ? Boolean(config.rejectUnauthorized)
            : false;

          this.logger.log(`Using OpenSearch configuration from profile: ${userId}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed to get dashboard profile: ${errorMessage}`);
      }
    }

    // Fall back to environment variables if needed
    if (!nodeUrl) {
      nodeUrl = this.configService.get<string>('OPENSEARCH_NODE');
      username = this.configService.get<string>('OPENSEARCH_USERNAME');
      password = this.configService.get<string>('OPENSEARCH_PASSWORD');
      rejectUnauthorized = this.configService.get<boolean>('OPENSEARCH_REJECT_UNAUTHORIZED', false);

      this.logger.log('Using OpenSearch configuration from environment variables');
    }

    if (!nodeUrl) {
      throw new Error('OpenSearch node URL not found in profile or environment variables');
    }

    const clientOptions: {
      node: string;
      auth?: { username: string; password: string };
      ssl?: { rejectUnauthorized: boolean };
      pool?: { min: number; max: number; maxRetries: number; requestTimeout: number };
    } = {
      node: nodeUrl,
      auth: username && password ? {
        username,
        password,
      } : undefined,
      ssl: {
        rejectUnauthorized,
      },
      pool: {
        min: minPoolSize,
        max: maxPoolSize,
        maxRetries: maxRetries,
        requestTimeout: requestTimeout,
      },
    };

    const client = new Client(clientOptions) as OpensearchClient;

    return client;
  }

  public async getLogIndex(userId?: string): Promise<string> {
    const logIndex = this.configService.get<string>('OPENSEARCH_LOG_INDEX', '');
    if (userId && this.dashboardProfileService) {
      try {
        const profile = await this.dashboardProfileService.getById(userId);
        if (profile?.opensearchConfig?.logIndex) {
          return profile.opensearchConfig.logIndex as string;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed to get dashboard profile: ${errorMessage}`);
      }
    }
    return logIndex;
  }

  public async getAlertIndex(userId?: string): Promise<string> {
    const alertIndex = this.configService.get<string>('OPENSEARCH_ALERT_INDEX', '');
    if (userId && this.dashboardProfileService) {
      try {
        const profile = await this.dashboardProfileService.getById(userId);
        if (profile?.opensearchConfig?.alertIndex) {
          return profile.opensearchConfig.alertIndex as string;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.logger.error(`Failed to get dashboard profile: ${errorMessage}`);
      }
    }
    return alertIndex;
  }
}
