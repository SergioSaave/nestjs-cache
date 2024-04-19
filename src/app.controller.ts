import { Body, Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Empresa, EmpresasController } from 'proto/empresa';
import { FeedRequest } from '../proto/empresa';

@Controller()
export class AppController implements EmpresasController {
  constructor(private readonly empresaService: AppService) {}

  @Get('registros')
  @GrpcMethod('Empresas', 'Registros')
  async registros(@Body() body: FeedRequest): Promise<{ feed: Empresa[] }> {
    return await this.empresaService.registros(body);
  }
}
