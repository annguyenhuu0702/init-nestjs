import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  constructor() {}
  healthCheck() {
    return {
      message: 'ok',
    };
  }
}
