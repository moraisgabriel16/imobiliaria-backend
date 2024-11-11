// server.js
const express = require('express');
const cors = require('cors'); // Importe o CORS
const clienteRoutes = require('./routes/clientes');

// Inicializa o aplicativo Express
const app = express();

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json());
app.use('/api', clienteRoutes);

// Exporta o app como uma função do Vercel
module.exports = app;
