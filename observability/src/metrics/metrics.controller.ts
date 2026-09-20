import { Controller, Get, Param, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service.js';



@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('system/latest')
  getLatestSystemMetrics() {
    return this.metricsService.getLatestSystemMetrics();
  }

  @Get('system')
  getSystemMetrics(@Query('minutes') minutes?: string) {
    return this.metricsService.getSystemMetrics(minutes ? Number(minutes) : 60);
  }

  @Get('containers/:id')
  getContainerMetrics(
    @Param('id') id: string,
    @Query('minutes') minutes?: string,

    ) {
    return this.metricsService.getContainerMetrics(
      id,
      minutes ? Number(minutes) : 60,
    );
  }
}