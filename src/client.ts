import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Redis } from 'ioredis';
const express = require('express');

const app = express();
const PORT = 5000;

const redis = new Redis();

app.use(express.json());

// Endpoint para manejar solicitudes POST
app.post('/registros', async (req, res) => {
  const requestData = req.body;
  console.log('Datos recibidos:', requestData);

  try {
    const response = await axios.post('http://localhost:3000/registros', requestData);
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
  console.log('Datos recibidos:', requestData);

  try {
    const cachedData = await redis.get('registros');
    if (cachedData) {
      console.log('Datos obtenidos de la caché');
      res.json(JSON.parse(cachedData));
    } else {
      console.log('No estaba en cache')
      const response = await axios.post('http://localhost:3000/registros', requestData);
      const dataToCache = response.data;
      await redis.set('registros', JSON.stringify(dataToCache), 'EX', 10);
      res.json(dataToCache);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Cliente Axios escuchando en http://localhost:${PORT}`);
});
