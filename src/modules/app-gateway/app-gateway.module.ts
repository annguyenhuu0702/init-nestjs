import { Logger, Module } from '@nestjs/common';
import { AppGateway } from '@app-gateway/app-gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway, Logger],
  exports: [],
})
export class AppGatewayModule {}
