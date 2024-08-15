import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import path = require('path');
import { LoggerModule } from '@logger/logger.module';
import { HealthCheckModule } from '@health-check/health-check.module';
import { AppLoggerMiddleware } from '@logger-middleware/logger.middleware';
import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { AppGatewayModule } from '@app-gateway/app-gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, `../.env`),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    LoggerModule.register('init_deploy_aws'),
    UserModule,
    HealthCheckModule,
    AppGatewayModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
