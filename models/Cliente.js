const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/clientes', clientController.listarClientes);
router.post('/clientes', clientController.cadastrarCliente);
router.get('/clientes/:cpf', clientController.detalhesCliente);
router.put('/clientes/:cpf', clientController.atualizarCliente); // Rota para atualizar cliente
router.delete('/clientes/:cpf', clientController.excluirCliente); // Rota para excluir cliente

module.exports = router;
