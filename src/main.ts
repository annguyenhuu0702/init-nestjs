import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from '@logger/logger.service';
import { GlobalExceptionFilter } from '@common/filter/global-exception.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const swaggerPrefix: string = config.get<string>('SWAGGER_PREFIX');
  const port: number = config.get<number>('PORT');
  const httpAdapter = app.get(HttpAdapterHost);
  const loggerService = app.get(LoggerService);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, loggerService));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  setupSwagger({
    app,
    swaggerPrefix,
  });
  await app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
bootstrap();
