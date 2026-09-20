import { Injectable } from '@nestjs/common';

import * as os from 'node:os';

import { statfs } from 'node:fs/promises';

interface CpuSnapshot {
  idle: number;
  total: number;
}

@Injectable()
export class SystemMetricsService {
  private previousCpuSnapshot: CpuSnapshot | null = null;

  async getMetrics() {
    const currentCpuSnapshot = this.getCpuSnapshot();

    const cpuUsagePercent = this.calculateCpuUsage(
      this.previousCpuSnapshot,
      currentCpuSnapshot,
    );

    this.previousCpuSnapshot = currentCpuSnapshot;

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const disk = await this.getDiskMetrics();

    return {
      cpu: {
        usagePercent: cpuUsagePercent,
        cores: os.cpus().length,
      },
      memory: {
        totalBytes: totalMemory,
        freeBytes: freeMemory,
        usedBytes: usedMemory,
        usagePercent: Number(((usedMemory / totalMemory) * 100).toFixed(2)),
      },

      disk,
      uptimeSeconds: os.uptime(),
    };
  }

  private getCpuSnapshot(): CpuSnapshot {
    const cpus = os.cpus();

    let idle = 0;
    let total = 0;

    for (const cpu of cpus) {
      idle += cpu.times.idle;

      total +=
        cpu.times.user +
        cpu.times.nice +
        cpu.times.sys +
        cpu.times.irq +
        cpu.times.idle;
    }

    return {
      idle,
      total,
    };
  }

  private calculateCpuUsage(
    previous: CpuSnapshot | null,
    current: CpuSnapshot,
  ): number | null {
    if (!previous) {
      return null;
    }

    const idleDelta = current.idle - previous.idle;
    const totalDelta = current.total - previous.total;

    if (totalDelta === 0) {
      return 0;
    }

    const usage = 1 - idleDelta / totalDelta;

    return Number((usage * 100).toFixed(2));
  }

  private async getDiskMetrics() {
    const stats = await statfs('/');

    const totalBytes = stats.blocks * stats.bsize;
    const freeBytes = stats.bfree * stats.bsize;

    const availableBytes = stats.bavail * stats.bsize;
    const usedBytes = totalBytes - freeBytes;

    return {
      totalBytes,
      usedBytes,
      freeBytes,
      availableBytes,

      usagePercent: Number(((usedBytes / totalBytes) * 100).toFixed(2)),
    };
  }
}
