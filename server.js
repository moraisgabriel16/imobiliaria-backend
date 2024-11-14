// server.js
require('dotenv').config();  // Carrega as variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');

const app = express();
app.use(cors());
app.use(express.json());

console.log("Conectando ao MongoDB com URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000 // Aumenta o tempo limite de seleção do servidor
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

app.use('/api', clienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
