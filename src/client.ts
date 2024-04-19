const PROTO_PATH = __dirname + '../../proto/empresa.proto';

import * as protoLoader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const { empresa } = grpc.loadPackageDefinition(packageDefinition) as any;

function main() {
  const client = new empresa.Empresas(
    'localhost:50051',
    grpc.credentials.createInsecure(),
  )

  client.feed2024({}, (err: any, response: any) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(response)
  })
}

main()