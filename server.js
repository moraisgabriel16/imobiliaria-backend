// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const clienteRoutes = require('./routes/clientes');

// Inicializa o aplicativo Express
const app = express();

// Configuração de CORS para permitir requisições do frontend hospedado no Vercel
app.use(cors({
    origin: 'https://imobiliaria-green.vercel.app', // ou use '*' para permitir todas as origens temporariamente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Middleware para processar JSON
app.use(express.json());

// Conexão com MongoDB usando Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Configuração das rotas
app.use('/api', clienteRoutes);

// Definindo a porta para o servidor local
const PORT = process.env.PORT || 5000;

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
