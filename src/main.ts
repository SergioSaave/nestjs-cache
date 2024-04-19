// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'empresa',
      protoPath: join(__dirname, '../../proto/empresa.proto'),
    },
  });
  await app.listen();
}
bootstrap();
