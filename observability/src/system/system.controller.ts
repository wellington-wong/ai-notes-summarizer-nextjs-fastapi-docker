import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service.js';



import { SystemMetricsService } from './system-metrics.service.js';

@Controller('system')
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    private readonly systemMetricsService: SystemMetricsService,
  ) {}

  @Get()
  getSystemInfo() {
    return this.systemService.getSystemInfo();
  }

  @Get('metrics')
  getMetrics() {
    return this.systemMetricsService.getMetrics();


  }
}