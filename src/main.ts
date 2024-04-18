
import { PrismaClient } from '@prisma/client';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const PROTO_PATH = __dirname + '../../../proto/empresa.proto';
const prisma = new PrismaClient();

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { empresa } = grpc.loadPackageDefinition(packageDefinition) as any;

async function feed(call: any, callback: any) {
  const feed = await prisma.empresas_2023.findFirst().then((empresas) => {
    console.log(empresas)
  });
  callback(null, { feed });
}

const server = new grpc.Server();
server.addService(empresa.Empresas.service, {
  feed,
});

const address = '0.0.0.0:50051';
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(`Error binding server to ${address}:`, err);
  } else {
    const message = `
    The gRPC server is being started on .
    You now can invoke any client script by its name, e.g.:
    or
    )} if you prefer a GUI client (download: https://github.com/uw-labs/bloomrpc)}).
    `;
    console.log(message);
    server.start();
  }
});
