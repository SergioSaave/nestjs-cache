import axios from 'axios';
import bodyParser from 'body-parser';
const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());

// Endpoint para manejar solicitudes POST
app.post('/registros', (req, res) => {
  
  const requestData = req.body; 
  console.log('Datos recibidos xd:', requestData);

  
  axios.post('http://localhost:3000/registros', requestData)
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      res.status(500).json({ error: 'Error en la solicitud' });
    });
});

app.listen(PORT, () => {
  console.log(`Cliente Axios escuchando en http://localhost:${PORT}`);
});
