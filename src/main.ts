import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ClientModule } from './client/client.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'empresa',
      protoPath: join(__dirname, '../../proto/empresa.proto'),
    },
  });
  app.listen();
  const appCliente = await NestFactory.create(ClientModule);
  appCliente.listen(3000);
}
bootstrap();
