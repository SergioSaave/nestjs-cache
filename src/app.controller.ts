// empresa.controller.ts

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Empresa } from 'proto/empresa';

@Controller()
export class AppController {
  constructor(private readonly empresaService: AppService) {}

  @GrpcMethod('Empresas', 'Feed')
  async feed(data: any, metadata: any) {
    // let empresas: Empresa[] = []
    return await this.empresaService.feed(data, metadata);
  }
}
