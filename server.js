// server.js
const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./routes/clientes');

// Inicializa o aplicativo Express
const app = express();

// Configuração do CORS para permitir requisições de qualquer origem
app.use(cors());
app.use(express.json());
app.use('/api', clienteRoutes);

// Definindo a porta para rodar localmente
const PORT = process.env.PORT || 5000;

if (require.main === module) {
    // O servidor só iniciará se este arquivo for executado diretamente (e não importado, como no caso do Vercel)
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Exporta o app como uma função do Vercel
module.exports = app;
