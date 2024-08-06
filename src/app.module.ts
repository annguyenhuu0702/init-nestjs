import { typeOrmAsyncConfig } from '@config/typeorm.config';
import { AppLoggerMiddleware } from '@logger-middlewarelogger.middleware';
import { LoggerModule } from '@loggerlogger.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user.module';
import path = require('path');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, `../.env`),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    LoggerModule.register('init_deploy_aws'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
