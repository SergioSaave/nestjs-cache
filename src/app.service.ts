// empresa.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Empresa } from 'proto/empresa';

@Injectable()
export class AppService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async feed(data: any, metadata: any) {
    try {
      const empresas = await this.prisma.empresas_2023.findFirst();
      
      const transformedEmpresas: Empresa = {
        id: Number(empresas.id),
        rut: empresas.rut,
        razonSocial: empresas.razon_social,
        fechaActuacion: empresas.fecha_actuacion,
        fechaRegistro: empresas.fecha_registro,
        fechaAprobacionSii: empresas.fecha_aprobacion_sii,
        Anio: empresas.anio,
        Mes: empresas.mes,
        ComunaTributaria: empresas.comuna_tributaria,
        RegionTributaria: empresas.region_tributaria,
        CodigoSociedad: empresas.codigo_sociedad,
        TipoActuacion: empresas.tipo_actuacion,
        Capital: Number(empresas.capital),
        ComunaSocial: empresas.comuna_social,
        RegionSocial: empresas.region_social
      };
  
      return { feed: [transformedEmpresas] };
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  }
  
}
