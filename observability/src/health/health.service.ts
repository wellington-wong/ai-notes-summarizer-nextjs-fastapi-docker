import { Injectable } from '@nestjs/common';

@Injectable()

export class HealthService {
  async check(url: string) {
    const start = performance.now();

    try {
      const response = await fetch(url);

      const responseTimeMs = performance.now() - start;


      return {
        url,
        healthy: response.ok,
        statusCode: response.status,
        responseTimeMs: Number(responseTimeMs.toFixed(2)),
      };
    } catch (error) {
      const responseTimeMs = performance.now() - start;
      return {

        url,
        healthy: false,
        statusCode: null,
        responseTimeMs: Number(responseTimeMs.toFixed(2)),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

}