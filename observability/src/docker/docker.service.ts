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
}
