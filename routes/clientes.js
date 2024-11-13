// routes/clientes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Verifique se cada rota tem o método correto e a função associada
router.get('/clientes', clientController.listarClientes);           // GET para listar clientes
router.post('/clientes', clientController.cadastrarCliente);        // POST para cadastrar cliente
router.get('/clientes/:cpf', clientController.detalhesCliente);     // GET para obter detalhes de um cliente
router.put('/clientes/:cpf', clientController.atualizarCliente);    // PUT para atualizar cliente
router.delete('/clientes/:cpf', clientController.excluirCliente);   // DELETE para excluir cliente

module.exports = router;
