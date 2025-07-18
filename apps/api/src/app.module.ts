import { PrismaModule } from '@clean-start-dashboard/database';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CachingModule } from './caching/caching.module';
import { DashboardCategoryModule } from './dashboard-category/dashboard-category.module';
import { DashboardProfileModule } from './dashboard-profile/dashboard-profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GrpcModule } from './grpc/grpc.module';
import { ImageModule } from './image/image.module';
import { OpenSearchModule } from './open-search/open-search.module';
import { RoleModule } from './role/role.module';
import { UserVariableModule } from './user-variable/user-variable.module';
import { WidgetModule } from './widget/widget.module';

@Module({
  imports: [
    OpenSearchModule,
    RoleModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],

      useFactory: async (configService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },

          ttl: 86400000, // milliseconds
        }),
      }),
    }),
    CachingModule,
    DashboardCategoryModule,
    DashboardProfileModule,
    PrismaModule,
    DashboardModule,
    WidgetModule,
    GrpcModule,
    UserVariableModule,
    ImageModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
