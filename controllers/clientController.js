// controllers/clientController.js
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Caminho para o arquivo Excel
const filePath = path.join(__dirname, '../data/clientes.xlsx');

// Função para validar CPF
const validarCPF = (cpf) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
};

// Função para validar Email
const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Função para validar Telefone
const validarTelefone = (telefone) => {
    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-\d{4}$/;
    return telefoneRegex.test(telefone);
};

// Função para listar todos os clientes
exports.listarClientes = (req, res) => {
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo de clientes não encontrado' });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Clientes'];
    const data = XLSX.utils.sheet_to_json(worksheet);
    res.json(data);
};

// Função para cadastrar um novo cliente
exports.cadastrarCliente = (req, res) => {
    const novoCliente = req.body;

    // Validações
    if (!validarCPF(novoCliente.cpf)) {
        return res.status(400).json({ error: 'CPF inválido. Use o formato XXX.XXX.XXX-XX.' });
    }
    if (novoCliente.email && !validarEmail(novoCliente.email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }
    if (!validarTelefone(novoCliente.telefonePrincipal)) {
        return res.status(400).json({ error: 'Telefone principal inválido. Use o formato (XX) XXXXX-XXXX.' });
    }

    let workbook;
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
    } else {
        workbook = XLSX.utils.book_new();
    }

    const worksheetName = 'Clientes';
    let worksheet = workbook.Sheets[worksheetName];

    if (!worksheet) {
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
    }

    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push(novoCliente);

    const updatedWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets[worksheetName] = updatedWorksheet;

    XLSX.writeFile(workbook, filePath);
    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
};

// Função para obter os detalhes de um cliente pelo CPF
exports.detalhesCliente = (req, res) => {
    const { cpf } = req.params;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo de clientes não encontrado' });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Clientes'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const cliente = data.find((cliente) => cliente.cpf === cpf);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
    }
};

// Função para atualizar um cliente pelo CPF
exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params;
    const clienteAtualizado = req.body;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo de clientes não encontrado' });
    }

    if (clienteAtualizado.cpf && !validarCPF(clienteAtualizado.cpf)) {
        return res.status(400).json({ error: 'CPF inválido. Use o formato XXX.XXX.XXX-XX.' });
    }
    if (clienteAtualizado.email && !validarEmail(clienteAtualizado.email)) {
        return res.status(400).json({ error: 'Email inválido.' });
    }
    if (clienteAtualizado.telefonePrincipal && !validarTelefone(clienteAtualizado.telefonePrincipal)) {
        return res.status(400).json({ error: 'Telefone principal inválido. Use o formato (XX) XXXXX-XXXX.' });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Clientes'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const clienteIndex = data.findIndex((cliente) => cliente.cpf === cpf);
    if (clienteIndex !== -1) {
        data[clienteIndex] = { ...data[clienteIndex], ...clienteAtualizado };
        const updatedWorksheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets['Clientes'] = updatedWorksheet;
        XLSX.writeFile(workbook, filePath);
        res.json({ message: 'Cliente atualizado com sucesso!' });
    } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
    }
};

// Função para excluir um cliente pelo CPF
exports.excluirCliente = (req, res) => {
    const { cpf } = req.params;

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Arquivo de clientes não encontrado' });
    }

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets['Clientes'];
    const data = XLSX.utils.sheet_to_json(worksheet);

    const clienteIndex = data.findIndex((cliente) => cliente.cpf === cpf);
    if (clienteIndex === -1) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    data.splice(clienteIndex, 1);
    const updatedWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets['Clientes'] = updatedWorksheet;
    XLSX.writeFile(workbook, filePath);
    res.json({ message: 'Cliente excluído com sucesso!' });

    
};
