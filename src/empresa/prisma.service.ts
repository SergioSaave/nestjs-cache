import { Injectable, OnModuleInit } from '@nestjs/common';
import { empresas_2023, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  async onModuleInit() {
    await 
  }

  async getEmpresas(): Promise<empresas_2023[]> {
    return this.prisma.empresas_2023.findMany();
  }
}
