import { Controller, Get, Param } from '@nestjs/common';
import { DockerService } from './docker.service.js';



@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('containers')
  getContainers() {
    return this.dockerService.getContainers();
  }

  @Get('containers/:id/stats')
  getContainerStats(@Param('id') id: string) {
    return this.dockerService.getContainerStats(id);
  }

  @Get('containers/metrics')
  getAllContainerMetrics() {
    return this.dockerService.getAllContainerMetrics();


  }

  @Get('containers/:id/metrics')
  getContainerMetrics(@Param('id') id: string) {
    return this.dockerService.getContainerMetrics(id);
  }
}