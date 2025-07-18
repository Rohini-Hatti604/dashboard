import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcService } from './grpc.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'IAM',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('GRPC_URL'),
            package: 'interface',
            protoPath: join(__dirname, 'proto', 'iam/interface.proto'),
            loader: {
              keepCase: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),

    // ClientsModule.register([
    //   {
    //     name: 'IAM',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: '155.248.243.157:50052',
    //       package: 'interface',
    //       protoPath: join(__dirname, 'proto', 'iam/interface.proto'),
    //       loader: {
    //         keepCase: true,
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [GrpcService],
  exports: [GrpcService],
})
export class GrpcModule { }
