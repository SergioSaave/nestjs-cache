import { Body, Controller, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empresa, EmpresasController } from 'proto/empresa';
import { FeedRequest } from '../proto/empresa';
import { AppService } from './app.service';

@Controller()
export class AppController implements EmpresasController {
  constructor(private readonly empresaService: AppService) {}

  @Post('registros')
  @GrpcMethod('Empresas', 'Registros')
  async registros(@Body() body: FeedRequest): Promise<{ feed: Empresa[] }> {
    return await this.empresaService.registros(body);
  }
}