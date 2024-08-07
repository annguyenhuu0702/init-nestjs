import { HealthCheckController } from '@health-check/health-check.controller';
import { HealthCheckService } from '@health-check/health-check.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
  exports: [HealthCheckService],
})
export class HealthCheckModule {}
