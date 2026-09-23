import { Module } from '@nestjs/common';
import { MonitorsService } from './monitors.service.js';
import { MonitorsController } from './monitors.controller.js';


@Module({
  providers: [MonitorsService],
  controllers: [MonitorsController],
  exports: [MonitorsService],
})
export class MonitorsModule {}
