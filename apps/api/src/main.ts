import { NestiaSwaggerComposer } from '@nestia/sdk';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // set global prefix
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 5000;
  app.use(
    // Paths you want to protect with basic auth
    '/swagger-api*',
    expressBasicAuth({
      challenge: true,
      users: {
        [(process.env.API_USER as string) ?? 'api-user']:
          process.env.API_PASSWORD ?? 'admin@123',
      },
    }),
  );
  const document = await NestiaSwaggerComposer.document(app, {
    openapi: '3.1',
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Localhost',
      },
    ],
  });
  SwaggerModule.setup('swagger-api', app, document as any);

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger API docs available at: http://localhost:${port}/swagger-api`);
  // console.log(`🔑 Swagger credentials: ${(process.env.API_USER as string) ?? 'api-user'} / ${process.env.API_PASSWORD ?? 'admin@123'}`);
}

bootstrap().catch(error => {
  console.error('❌ Error starting the application:', error);
  process.exit(1);
});
