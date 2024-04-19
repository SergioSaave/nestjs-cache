// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMPRESA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'empresa',
          protoPath: join(__dirname, '../../proto/empresa.proto'),
        },
      },
    ]),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
