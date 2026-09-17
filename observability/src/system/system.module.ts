import { Module } from '@nestjs/common';
import { SystemController } from './system.controller.js';
import { SystemService } from './system.service.js';
import { SystemMetricsService } from './system-metrics.service.js';

@Module({
  controllers: [SystemController],
  providers: [SystemService, SystemMetricsService]
})
export class SystemModule {}
