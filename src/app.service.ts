// empresa.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Empresa, FeedRequest, FeedResponse } from 'proto/empresa';

@Injectable()
export class AppService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registros(data: FeedRequest): Promise<FeedResponse> {
    try {
      let empresas: any[] = [];
      if(data.anho === "2023"){
        empresas = await this.prisma.empresas_2023.findMany({
          take: 100
        });
      }
      else {
        empresas = await this.prisma.empresas_2024.findMany({
          take: 100
        });
      }
  
      const transformedEmpresas: Empresa[] = empresas.map(empresa => ({
        id: Number(empresa.id),
        rut: empresa.rut,
        razonSocial: empresa.razon_social,
        fechaActuacion: empresa.fecha_actuacion,
        fechaRegistro: empresa.fecha_registro,
        fechaAprobacionSii: empresa.fecha_aprobacion_sii,
        Anio: Number(empresa.anio),
        Mes: empresa.mes,
        ComunaTributaria: empresa.comuna_tributaria,
        RegionTributaria: Number(empresa.region_tributaria),
        CodigoSociedad: empresa.codigo_sociedad,
        TipoActuacion: empresa.tipo_actuacion,
        Capital: Number(empresa.capital),
        ComunaSocial: empresa.comuna_social,
        RegionSocial: Number(empresa.region_social)
      }));
  
      return { feed: transformedEmpresas } as FeedResponse;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  }
}
