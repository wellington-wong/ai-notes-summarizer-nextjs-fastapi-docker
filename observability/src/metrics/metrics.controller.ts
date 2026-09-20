import { Controller, Get, Param, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service.js';


import { MetricsQueryDto } from './dto/metrics-query.dto.js';
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('system/latest')
  getLatestSystemMetrics() {
    return this.metricsService.getLatestSystemMetrics();
  }

  @Get('system')
  getSystemMetrics(@Query() query: MetricsQueryDto)
  {
    return this.metricsService.getSystemMetrics(query.minutes);
  }

  @Get('containers/:id')
  getContainerMetrics(
    @Param('id') id: string,

    @Query() query: MetricsQueryDto,
    ) {
    return this.metricsService.getContainerMetrics(
      id,
      query.minutes,
    );
  }
}