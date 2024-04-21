import axios from 'axios';
import * as crypto from 'crypto';
import { Redis } from 'ioredis';
const express = require('express');
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
  const hash = crypto.createHash('sha1');
  const hashValue = parseInt(hash.update(key).digest('hex'), 16);
  const idPartition = hashValue % partitions;
  return idPartition;
};

const app = express();
const PORT = 5001;

app.use(express.json());
``;

const redisDistros = [
  new Redis({ host: 'localhost', port: 6382 }),
  new Redis({ host: 'localhost', port: 6383 }),
  new Redis({ host: 'localhost', port: 6384 }),
];

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

// Endpoint para manejar solicitudes POST
app.post('/registros', async (req, res) => {
  const requestData = req.body;
  console.log('Datos recibidos:', requestData);

  try {
    const response = await axios.post(
      'http://localhost:3000/registros',
      requestData,
    );
    console.log('Respuesta del servidor:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

// Endpoint para manejar solicitudes GET con caché
app.get('/registros', async (req, res) => { 
  const requestData = req.body;
  try {
    const cachedData = await redis.get(requestData.anho);
    if (cachedData) {
      console.log('Datos obtenidos de la caché');
      res.json(JSON.parse(cachedData));
    } else {
      console.log('No estaba en caché');
      client.registros({ anho: requestData.anho }, async (error, response) => {
        if (error) {
          console.log('Error en la solicitud:', error);
          res.status(500).json({ error: 'Error en la solicitud' });
        } else {
          const dataToCache = response.feed;
          await redis.set(
            requestData.anho,
            JSON.stringify(dataToCache),
            'EX',
            10,
          );
          res.json(response.data);
        }
      });
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.get('/partition/:mes', async (req, res) => {
  const requestData = req.body;
  const { mes } = req.params;
  const key = `registros:${mes}`;

  try {
    const idPartition = hashPartition(key, 3);
    const redisPartition = redisDistros[idPartition];

    const cachedData = await redisPartition.get(key);

    if (cachedData) {
      console.log('Datos obtenidos de la caché');
      res.json(JSON.parse(cachedData));
    } else {
      console.log('No estaba en cache');
      client.partition(
        { anho: requestData.anho, mes },
        async (error, response) => {
          if (error) {
            console.log('Error en la solicitud:', error);
            res.status(500).json({ error: 'Error en la solicitud' });
          } else {
            const dataToCache = response.feed;
            await redis.set(
              key,
              JSON.stringify(dataToCache),
              'EX',
              30,
            );
            res.json(response.feed);
          }
        },
      );
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Cliente Axios escuchando en http://localhost:${PORT}`);
});
