import { ReflectionService } from '@grpc/reflection';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'empresa',
    protoPath: join(__dirname, '../../proto/empresa.proto'),
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};