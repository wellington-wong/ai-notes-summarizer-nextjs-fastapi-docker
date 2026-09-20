import { Controller, Get, Query } from '@nestjs/common';
import { HealthService } from './health.service.js';



@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('check')
  check(@Query('url') url: string) {
    return this.healthService.check(url);
  }


}