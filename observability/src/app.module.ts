import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { MonitorsModule } from './monitors/monitors.module.js';
import { EventsModule } from './events/events.module.js';
import { MetricsModule } from './metrics/metrics.module.js';
import { AlertsModule } from './alerts/alerts.module.js';
import { HealthModule } from './health/health.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'observability',
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    MonitorsModule,
    EventsModule,
    MetricsModule,
    AlertsModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
