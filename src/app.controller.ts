import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { EmpresasController, FeedResponse, PartRequest, PartResponse } from 'proto/empresa';
import { FeedRequest } from '../proto/empresa';
import { AppService } from './app.service';

@Controller()
export class AppController implements EmpresasController {
  constructor(private readonly empresaService: AppService) {}

  @GrpcMethod('Empresas', 'Registros')
  async registros(@Body() body: FeedRequest): Promise<FeedResponse> {
    return await this.empresaService.registros(body);
  }
  
  @GrpcMethod('Empresas', 'Partition')
  async partition(@Body() body: PartRequest): Promise<PartResponse>{
    return await this.empresaService.partition(body);
  }
}
