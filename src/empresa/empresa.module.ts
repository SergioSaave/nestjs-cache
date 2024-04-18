import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOptions } from 'src/grpc-client.options';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPRESA_PACKAGE',
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [EmpresaController],
  providers: [PrismaService],
})
export class EmpresaModule {}
