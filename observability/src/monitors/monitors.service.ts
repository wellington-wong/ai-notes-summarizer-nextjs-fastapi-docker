import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';



@Injectable()
export class MonitorsService {
  constructor(private readonly prisma: PrismaService) {}

  getEnabledMonitors() {
    return this.prisma.monitor.findMany({
      where: {
        enabled: true,

      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createHealthCheck(


    monitorId: number,
    result: {
      healthy: boolean;
      statusCode: number | null;
      responseTimeMs: number;
      error?: string;
    },
  ) {
    return this.prisma.healthCheck.create({

      data: {
        monitorId,
        healthy: result.healthy,
        statusCode: result.statusCode,
        responseTimeMs: result.responseTimeMs,
        error: result.error,
      },
    });
  }

}