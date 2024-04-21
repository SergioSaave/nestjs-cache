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
  import * as crypto from 'crypto'
  const protoLoader = require('@grpc/proto-loader');
  const grpc = require('@grpc/grpc-js');
  const packageDefinition = protoLoader.loadSync('proto/empresa.proto');
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
  const grpcService = protoDescriptor;
  
  const client = new grpcService.empresa.Empresas(
    'localhost:50051',
    grpc.credentials.createInsecure(),
  );
  
  const hashPartition = (key: string, partitions: number): number => {
    const hash = crypto.createHash('sha256');
    const hashValue = parseInt(hash.update(key).digest('hex'), 16);
    const idPartition = hashValue % partitions;
    return idPartition;
  };
  
  const redisDistros = [
    new Redis({ host: 'localhost', port: 6383 }),
    new Redis({ host: 'localhost', port: 6384 }),
    new Redis({ host: 'localhost', port: 6385 }),
  ];
  
  const redisClasico = new Redis({
    host: 'localhost',
    port: 6379,
  });
  const redis = new Redis({
    host: 'localhost',
    port: 6380,
  });
  
  @Controller('client')
  export class ClientController {

    // Clásico
    @Get('registros')
    async registrosClasico(@Body() requestData, @Res() res) {
      try {
        const cachedData = await redisClasico.get(requestData.anho);
  
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
                await redisClasico.set(
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

    // Replicado
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
  
    // Particionado
    @Post('partition/:mes')
    async partition(@Param('mes') mes: string, @Body() requestData, @Res() res) {
      
      const key = `registros:${mes}`;
      try {
        const idPartition = hashPartition(key, 3);
        const redisPartition = redisDistros[idPartition];
    
        const cachedData = await redisPartition.get(key);
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
                await redisPartition.set(
                  key,
                  JSON.stringify(response.empresa),
                  'EX',
                  50,
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