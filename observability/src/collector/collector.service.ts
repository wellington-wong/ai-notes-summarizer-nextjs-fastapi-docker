import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DockerService } from '../docker/docker.service.js';

import { SystemMetricsService } from '../system/system-metrics.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { HealthService } from '../health/health.service.js';
@Injectable()
export class CollectorService {
  private readonly logger = new Logger(CollectorService.name);

  constructor(
    private readonly dockerService: DockerService,
    private readonly systemMetricsService: SystemMetricsService,

    private readonly prisma: PrismaService,
    private readonly healthService: HealthService,
  ) {}

  @Cron('*/10 * * * * *')
  async collect() {

    const systemMetrics = await this.systemMetricsService.getMetrics();
    await this.prisma.systemMetric.create({
      data: {

        cpuUsagePercent: systemMetrics.cpu.usagePercent ?? 0,
        memoryUsagePercent: systemMetrics.memory.usagePercent,

        diskUsagePercent: systemMetrics.disk.usagePercent,
        uptimeSeconds: systemMetrics.uptimeSeconds,
      },
    });

    const containers = await this.dockerService.getContainers();

    const containerMetrics = [];

    for (const container of containers) {
      if (container.state !== 'running') {
        continue;
      }

      const metrics = await this.dockerService.getContainerMetrics(
        container.id,

      );

      await this.prisma.containerMetric.create({
        data: {
          containerId: metrics.containerId,
          containerName: metrics.name,
          cpuUsagePercent: metrics.cpu.usagePercent,
          memoryUsageBytes: metrics.memory.usageBytes,
          memoryLimitBytes: metrics.memory.limitBytes,

        },
      });

      containerMetrics.push(metrics);
    }

    this.logger.log(
      JSON.stringify({
        system: systemMetrics,
        containers: containerMetrics,
      }),
    );
  }
}