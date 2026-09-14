import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service.js';


@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getSystemInfo() {
    return this.systemService.getSystemInfo();
  }
}