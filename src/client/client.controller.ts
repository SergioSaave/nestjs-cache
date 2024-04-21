import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Redis } from 'ioredis';
const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');
const packageDefinition = protoLoader.loadSync('proto/empresa.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const grpcService = protoDescriptor;

const client = new grpcService.empresa.Empresas(
  'localhost:50051',
  grpc.credentials.createInsecure(),
);

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

@Controller('client')
export class ClientController {
  @Post('registros')
  async registros(@Body() requestData, @Res() res) {
    try {
      const cachedData = await redis.get(requestData.anho);

      if (cachedData) {
        console.log('Datos obtenidos de la caché');
        return res.status(HttpStatus.OK).json(JSON.parse(cachedData));
      } else {
        console.log('No estaba en caché');
        await client.Registros(
          { anho: requestData.anho },
          async (error, response) => {
            if (error) {
              console.log('Error en la solicitud:', error);
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Error en la solicitud',
              });
            } else {
              await redis.set(
                requestData.anho,
                JSON.stringify(response.feed),
                'EX',
                10,
              );

              return res.status(HttpStatus.OK).json(response.feed);
            }
          },
        );
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error en la solicitud',
      });
    }
  }

  @Post('partition/:mes')
  async partition(@Param('mes') mes: string, @Body() requestData, @Res() res) {
    try {
      const cachedData = await redis.get(`registros_${mes}`);
      if (cachedData) {
        console.log('Datos obtenidos de la caché');
        return res.status(HttpStatus.OK).json(JSON.parse(cachedData));
      } else {
        console.log('No estaba en caché');
        await client.Partition(
          { anho: requestData.anho, mes },
          async (error, response) => {
            if (error) {
              console.log('Error en la solicitud:', error);
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: 'Error en la solicitud',
              });
            } else {
              await redis.set(
                `registros_${mes}`,
                JSON.stringify(response.data),
                'EX',
                10,
              );

              return res.status(HttpStatus.OK).json(response.empresa);
            }
          },
        );
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error en la solicitud',
      });
    }
  }
}
