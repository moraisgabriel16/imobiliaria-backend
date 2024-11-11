// controllers/clientController.js
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Caminho para o arquivo Excel
const filePath = path.join(__dirname, '../data/clientes.xlsx');

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

    const updatedData = data.filter((cliente) => cliente.cpf !== cpf);
    if (data.length === updatedData.length) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const updatedWorksheet = XLSX.utils.json_to_sheet(updatedData);
    workbook.Sheets['Clientes'] = updatedWorksheet;
    XLSX.writeFile(workbook, filePath);
    res.json({ message: 'Cliente excluído com sucesso!' });
};
