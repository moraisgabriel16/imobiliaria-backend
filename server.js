require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');
const mongoose = require('mongoose');

// Inicializa o aplicativo Express
const app = express();

// Middleware de CORS para permitir requisições de qualquer origem
// Adicionando configurações mais específicas de CORS se necessário
app.use(cors({
    origin: '*', // Alternativamente, pode restringir a 'https://imobiliaria-green.vercel.app' para mais segurança
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Middleware para fazer o parsing do JSON no body
app.use(express.json());

// Conectar ao MongoDB Atlas usando a variável de ambiente
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    // Isso vai garantir que o erro de conexão ao banco seja sempre tratado
});

// Definindo a rota para clientes
app.use('/api', clienteRoutes);

// Definindo a porta para rodar localmente
const PORT = process.env.PORT || 5000;

// Inicializar servidor (apenas se não estiver no ambiente serverless)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Exporta o app como uma função para o Vercel
module.exports = app;
