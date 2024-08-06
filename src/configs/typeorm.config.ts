import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: configService.get<string>('INIT_DEPLOY_DB_URL'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
      logging: configService.get<string>('ENV') === 'local' ? ['query', 'error'] : false,
      schema: configService.get<string>('INIT_DEPLOY_DB_URL_SCHEMA'),
      applicationName: configService.get<string>('DB_APP_NAME') || 'mickey_mouse',
    };
  },
};
