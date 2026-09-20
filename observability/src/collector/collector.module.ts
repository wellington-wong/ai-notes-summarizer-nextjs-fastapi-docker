import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service.js';



import { DockerModule } from '../docker/docker.module.js';
import { SystemModule } from '../system/system.module.js';

@Module({
  imports: [SystemModule, DockerModule],
  providers: [CollectorService],
})
export class CollectorModule {}