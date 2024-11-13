require('dotenv').config();
const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');
const mongoose = require('mongoose');

// Inicializa o aplicativo Express
const app = express();

// Conectar ao MongoDB Atlas usando a variável de ambiente
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json());
app.use('/api', clienteRoutes);

// Definindo a porta para rodar localmente
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Exporta o app como uma função do Vercel
module.exports = app;
