// server.js
const express = require('express');
const cors = require('cors'); // Importe o CORS
const app = express();
const clienteRoutes = require('./routes/clientes');

app.use(cors()); // Ative o CORS para permitir requisições de qualquer origem
app.use(express.json());
app.use('/api', clienteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
