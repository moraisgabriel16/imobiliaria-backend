// controllers/clientController.js
const Cliente = require('../models/Cliente');

exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json({ data: clientes });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
};

exports.cadastrarCliente = async (req, res) => {
    try {
        const novoCliente = new Cliente(req.body);
        await novoCliente.save();
        res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
};

exports.detalhesCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const cliente = await Cliente.findOne({ cpf });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter detalhes do cliente:', error);
        res.status(500).json({ error: 'Erro ao obter detalhes do cliente' });
    }
};

exports.atualizarCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const clienteAtualizado = await Cliente.findOneAndUpdate({ cpf }, req.body, { new: true });
        if (clienteAtualizado) {
            res.json({ message: 'Cliente atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

exports.excluirCliente = async (req, res) => {
    try {
        const { cpf } = req.params;
        const clienteExcluido = await Cliente.findOneAndDelete({ cpf });
        if (clienteExcluido) {
            res.json({ message: 'Cliente excluído com sucesso!' });
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
};
