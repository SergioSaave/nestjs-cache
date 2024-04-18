import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import {
  Empresa,
  EmpresaServiceClient,
  GetEmpresasRequest,
  GetEmpresasResponse,
} from 'proto/empresa';
import { Observable, of } from 'rxjs';

@Controller('empresa')
export class EmpresaController implements OnModuleInit {
  private empresaService: EmpresaServiceClient;
  private prismaService: PrismaService;

  constructor(@Inject('EMPRESA_PACKAGE') private readonly client: ClientGrpc, private readonly prisma: PrismaService) {}

  async onModuleInit() {
    this.empresaService =
      this.client.getService<EmpresaServiceClient>('EmpresaService');
  }

  @GrpcMethod('EmpresaService', 'GetEmpresas')
    getEmpresas(request: GetEmpresasRequest) {
        console.log(this.prismaService);
        const empresas: GetEmpresasResponse = 
        { 
            empresas: 
                [
                    {id: 1, rut: '1-9', razonSocial: 'Empresa 1', fechaActuacion: '2021-01-01', fechaRegistro: '2021-01-01', fechaAprobacionSii: '2021-01-01', Anio: 2021, Mes: 'Enero', ComunaTributaria: 'Comuna 1', RegionTributaria: 1, CodigoSociedad: 'Codigo 1', TipoActuacion: 'Actuacion 1', Capital: 1000000, ComunaSocial: 'Comuna 1', RegionSocial: 1},
                    {id: 2, rut: '2-7', razonSocial: 'Empresa 2', fechaActuacion: '2021-02-01', fechaRegistro: '2021-02-01', fechaAprobacionSii: '2021-02-01', Anio: 2021, Mes: 'Febrero', ComunaTributaria: 'Comuna 2', RegionTributaria: 2, CodigoSociedad: 'Codigo 2', TipoActuacion: 'Actuacion 2', Capital: 2000000, ComunaSocial: 'Comuna 2', RegionSocial: 2},
                    {id: 3, rut: '3-8', razonSocial: 'Empresa 3', fechaActuacion: '2021-03-01', fechaRegistro: '2021-03-01', fechaAprobacionSii: '2021-03-01', Anio: 2021, Mes: 'Marzo', ComunaTributaria: 'Comuna 3', RegionTributaria: 3, CodigoSociedad: 'Codigo 3', TipoActuacion: 'Actuacion 3', Capital: 3000000, ComunaSocial: 'Comuna 3', RegionSocial: 3},
                ]
        }
        return empresas; 
    }
}
