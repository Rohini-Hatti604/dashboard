import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import bencode from 'bencode';
import { OpensearchClient } from 'nestjs-opensearch';
import { CachingService } from 'src/caching/caching.service';
import { ISearchQueryRequestPayload } from './dto/open-search-query.dto';
import { OpenSearchClientProvider } from './opensearch-client.provider';

type MappingProperties = {
  [key: string]: {
    type: string;
    properties?: MappingProperties;
  };
};

interface MappingInput {
  mappings: {
    properties: MappingProperties;
  };
}

interface Output {
  label: string;
  name: string;
  type: string;
}

interface ProcessNode {
  pid: number;
  name: string;
  cmd: string;
  filePath: string;
  fileHash: string;
  user: string;
  integrityLevel: number;
  children: ProcessNode[];
}
@Injectable()
export class OpenSearchService {
  private readonly logger = new Logger(OpenSearchService.name);

  public constructor(
    private readonly opensearchClientProvider: OpenSearchClientProvider,
    private cachingService: CachingService,
  ) {}


  
 

  // async singleDataIngestion(input: any): Promise<any> {
  //   this.logger.log(
  //     `Inside singleUpload() Method | Ingesting single data with index ${input.indexName} `,
  //   );

  //   const data = input.data[0];

  //   try {
  //     const res = await this.searchClient.index({
  //       id: data.id,
  //       index: input.indexName,
  //       body: data,
  //     });
  //     return res.body;
  //   } catch (err) {
  //     this.logger.error(`Exception occurred : ${err})`);
  //     return {
  //       httpCode: 500,
  //       error: err,
  //     };
  //   }
  // }

  /**
   * Get the OpenSearch client for the current user or specified user ID
   * @param userId Optional user ID (defaults to this.userId if not provided)
   * @returns The configured OpenSearch client
   */
  private async getClient(userId?: string): Promise<OpensearchClient> {
    return this.opensearchClientProvider.getClient(userId);
  }
  
  /**
   * Get the node URL from the client object
   * This utility function extracts the node URL from the client's configuration
   * @param client The OpenSearch client
   * @returns The node URL as a string or 'default' if not found
   */
  private getNodeUrlFromClient(client: OpensearchClient): string {
    try {
      // Access the internal configuration of the client
      const nodeConfig = client.transport?.connectionPool?.connections?.[0]?.url?.href;
      return nodeConfig || 'default';
    } catch (error) {
      this.logger.warn(`Failed to extract node URL from client: ${error.message}`);
      return 'default';
    }
  }

  async searchByQuery(input: ISearchQueryRequestPayload): Promise<any> {
    this.logger.log(`Inside searchByQuery() Method`);
    let body: any;

    this.logger.log(
      `Searching for query: ${input.query} in the indexes : ${input?.indexes?.join(',')} `,
    );
    // eslint-disable-next-line prefer-const
    body = {
      ...(input.options ?? {}),
      aggs: input.aggs ?? {},
      query: input.query,
    };

    const msearchRequest: any = [];

    input.indexes.map((index) => {
      msearchRequest.push({ index: index });
      msearchRequest.push({ ...body });
    });

    try {
      // Get the client directly
      const client = await this.getClient();
      const nodeUrl = this.getNodeUrlFromClient(client);
      
      
      // Create a cache key that includes the node URL to avoid conflicts
      const cacheKey = {
        query: msearchRequest,
        clusterUrl: nodeUrl 
      };
      
      this.logger.log(`Checking cache with cluster URL: ${nodeUrl}`);
      const cacheData = await this.cachingService.getCacheByQuery(cacheKey);

      if (cacheData !== null) {
        this.logger.log(`Returning data from cache for cluster: ${nodeUrl}`);
        return cacheData;
      }
      this.logger.log(`Reading data from opensearch`);
      const res = await client.msearch({
        body: msearchRequest,
      });

      if (res.statusCode == 200) {
        this.logger.log(`Saving data to redis cache for cluster: ${nodeUrl}`);
        await this.cachingService.setCacheByQuery(cacheKey, res);
      }

      return res;
    } catch (error) {
      this.logger.error(
        `Exception occurred while doing : ${JSON.stringify(error?.name)})`,
      );

      // return error

      throw new Error(
        `Exception occurred while doing : ${JSON.stringify(error?.name)})`,
      );
    }
  }

  async aggregateQuery(input: any, userId?: string): Promise<any> {
    this.logger.log(`Inside aggregateQuery() Method`);
    try {
      // Get the client directly based on provided userId or class userId
      const client = await this.getClient(userId);
      const nodeUrl = this.getNodeUrlFromClient(client);
      
      // Create a cache key that includes the node URL
      const cacheKey = {
        query: input,
        clusterUrl: nodeUrl 
      };
      
      this.logger.log(`Checking aggregate cache with cluster URL: ${nodeUrl}`);
      const cacheData = await this.cachingService.getCacheByQuery(cacheKey);
      if (cacheData !== null) {
        this.logger.log(`Returning data from cache for cluster: ${nodeUrl}`);
        return cacheData;
      } else {
        this.logger.log(`Reading data from opensearch`);
        const res = await client.msearch({
          body: input,
        });

        if (res.statusCode == 200) {
          this.logger.log(`Saving data to redis cache for cluster: ${nodeUrl}`);
          await this.cachingService.setCacheByQuery(cacheKey, res);
          return res;
        } else {
          // return res;
          new HttpException(
            'Unable to process',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (error) {
      this.logger.error(
        `Exception occurred while doing : ${JSON.stringify(error?.name)})`,
      );
      return error
      new HttpException('Timeout', HttpStatus.GATEWAY_TIMEOUT);
    }
  }

  async getFields(userId?: string): Promise<any> {
    // Get the client directly
    const client = await this.getClient(userId);
    const nodeUrl = this.getNodeUrlFromClient(client);
    
    // Create a cache key that includes the node URL
    const baseCacheKey = {
      index: 'esdl-alerts-*',
      type: 'get-fileds',
    };
    
    const cacheKey = {
      query: baseCacheKey,
      clusterUrl: nodeUrl 
    };
    
    this.logger.log(`Checking fields cache with cluster URL: ${nodeUrl}`);
    const cacheData = await this.cachingService.getCacheByQuery(cacheKey);
    if (cacheData) {
      this.logger.log(`Returning fields data from cache for cluster: ${nodeUrl}`);
      return cacheData;
    } else {
      const data = await client.indices.getMapping({
        index: '',
      });

      // console.log('data', data?.body['esdl-alerts-4.x-2024.11.05']);
      const keys = Object.keys(data?.body);

      // return data?.body[keys[keys.length - 1]];

      const options = await Promise.all(
        this.convertMappingsToOutput(data?.body[keys[keys.length - 1]]),
      );
      if (options.length) {
        this.logger.log(`Saving fields data to redis cache for cluster: ${nodeUrl}`);
        await this.cachingService.setCacheByQuery(cacheKey,options);
      }

      return options;
    }

    // return this.searchClient.indices.getMapping({
    //   index: 'esdl-archives-4.x-2024.07.01',
    // });
  }

  // conversion functions

  private convertMappingsToOutput(input: MappingInput): Output[] {
    const result: Output[] = [];

    function processProperties(
      properties: MappingProperties,
      parentKey: string = '',
    ): void {
      for (const key in properties) {
        const currentProperty = properties[key];
        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (currentProperty.properties) {
          // If there are nested properties, recursively process them
          processProperties(currentProperty.properties, currentKey);
        } else {
          // Add the current property to the result
          result.push({
            label: currentKey,
            name: currentKey,
            type: currentProperty.type,
          });
        }
      }
    }

    // Start processing the top-level properties
    processProperties(input.mappings.properties);

    return result;
  }



  async createProcessTree(logs: any[]): Promise<Record<string, ProcessNode[]>> {
    const processMap: Record<string, Record<number, ProcessNode>> = {};

    // Step 1: Organize logs by tenant/endpoint
    logs.forEach(log => {
      const agentGuid = log.data.endpoint_agentGuid;
      if (!processMap[agentGuid]) processMap[agentGuid] = {};

      const parentPid = log.data.parentPid;
      const processPid = log.data.processPid;

      // Create parent node if missing
      if (parentPid && !processMap[agentGuid][parentPid]) {
        processMap[agentGuid][parentPid] = {
          pid: parentPid,
          name: log.data.parentName,
          cmd: log.data.parentCmd,
          filePath: log.data.parentFilePath,
          fileHash: log.data.parentFileHash,
          user: log.data.parentUser,
          integrityLevel: log.data.parentIntegrityLevel || 0,
          children: []
        };
      }

      // Create process node
      if (!processMap[agentGuid][processPid]) {
        processMap[agentGuid][processPid] = {
          pid: processPid,
          name: log.data.processName,
          cmd: log.data.processCmd,
          filePath: log.data.processFilePath,
          fileHash: log.data.processFileHash,
          user: log.data.processUser,
          integrityLevel: log.data.integrityLevel || 0,
          children: []
        };
      }

      // Link child to parent
      if (parentPid) {
        processMap[agentGuid][parentPid].children.push(processMap[agentGuid][processPid]);
      }
    });

    // Step 2: Extract trees per endpoint
    const processTrees: Record<string, ProcessNode[]> = {};
    Object.keys(processMap).forEach(agentGuid => {
      processTrees[agentGuid] = Object.values(processMap[agentGuid]).filter(node => !logs.some(log => log.data.processPid === node.pid));
    });

    return processTrees;
  }
}
