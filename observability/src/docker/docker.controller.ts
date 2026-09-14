import { Controller, Get } from '@nestjs/common';
import { DockerService } from './docker.service.js';



@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('containers')
  getContainers() {
    return this.dockerService.getContainers();
  }

}