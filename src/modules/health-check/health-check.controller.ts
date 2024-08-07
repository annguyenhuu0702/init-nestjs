import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckService } from '@health-check/health-check.service';

@Controller('health-check')
@ApiTags('Health Check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  async healthCheck() {
    return this.healthCheckService.healthCheck();
  }
}
