import { Injectable } from '@nestjs/common';
import * as os from 'node:os';


@Injectable()
export class SystemService {
  getSystemInfo() {
    return {
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      uptime: os.uptime(),
      cpuCount: os.cpus().length,

      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      loadAverage: os.loadavg(),
    };
  }
}
