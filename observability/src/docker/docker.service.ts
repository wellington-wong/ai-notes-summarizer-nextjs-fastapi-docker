import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';


@Injectable()
export class DockerService {
  private readonly docker: Docker;

  constructor() {
    this.docker = new Docker({
      socketPath: '/var/run/docker.sock',
    });
  }

  async getContainers() {
    const containers = await this.docker.listContainers({
      all: true,
    });

    return containers.map((container) => ({
      id: container.Id,
      name: container.Names[0]?.replace(/^\//, ''),

      image: container.Image,
      state: container.State,
      status: container.Status,
    }));
  }

  async getContainerStats(containerId: string) {
    const container = this.docker.getContainer(containerId);

    const stats = await container.stats({
      stream: false,
    });

    return stats;
  }

  private calculateCpuUsage(stats: Docker.ContainerStats) {
    const cpuDelta =
      stats.cpu_stats.cpu_usage.total_usage -
      stats.precpu_stats.cpu_usage.total_usage;

    const systemDelta =
      stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;

    const cpuCount =
      stats.cpu_stats.online_cpus ??
      stats.cpu_stats.cpu_usage.percpu_usage?.length ??
      1;

    if (systemDelta <= 0 || cpuDelta < 0) {
      return 0;
    }

    return Number(((cpuDelta / systemDelta) * cpuCount * 100).toFixed(2));
  }

  async getContainerMetrics(containerId: string) {
    const container = this.docker.getContainer(containerId);

    const [stats, inspect] = await Promise.all([
      container.stats({
        stream: false,
      }),

      container.inspect(),
    ]);

    const memoryUsage = stats.memory_stats.usage ?? 0;
    const memoryLimit = stats.memory_stats.limit ?? 0;

    const memoryUsagePercent =
      memoryLimit > 0
        ? Number(((memoryUsage / memoryLimit) * 100).toFixed(2))
        : 0;

    return {
      containerId: inspect.Id,
      name: inspect.Name.replace(/^\//, ''),
      cpu: {
        usagePercent: this.calculateCpuUsage(stats),
      },
      memory: {
        usageBytes: memoryUsage,
        limitBytes: memoryLimit,
        usagePercent: memoryUsagePercent,
      },
    };
  }
}
