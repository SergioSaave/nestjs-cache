import { Body, Controller, Post, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Empresa, EmpresasController, FeedResponse, PartRequest, PartResponse } from 'proto/empresa';
import { FeedRequest} from '../proto/empresa';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController implements EmpresasController {
  constructor(private readonly empresaService: AppService) {}

  // @Post('registros')
  @GrpcMethod('Empresas', 'Registros')
  async registros(@Body() body: FeedRequest): Promise<FeedResponse> {
    return await this.empresaService.registros(body);
  }
  
  // @Post('partition')
  @GrpcMethod('Empresas', 'Registros')
  async partition(@Body() body: PartRequest): Promise<PartResponse>{
    return await this.empresaService.partition(body);
  }
}
