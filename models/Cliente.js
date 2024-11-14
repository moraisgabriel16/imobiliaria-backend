// models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    cpf: { type: String, unique: true },          // CPF não obrigatório, mas único
    nome: String,                                  // Nome opcional
    dataNascimento: Date,
    telefonePrincipal: String,
    telefoneSecundario: String,
    email: String,
    enderecoImovel: String,
    torre: String,
    apartamento: String,
    tipoImovel: String,
    areaImovel: String,
    quartos: Number,
    banheiros: Number,
    vagasGaragem: Number,
    dataInicioContrato: Date,
    dataTerminoContrato: Date,
    valorAluguel: Number,
    vencimentoBoleto: Number,
    formaPagamento: String,
    taxaCondominio: Number,
    taxaIptu: Number,
    multaAtraso: Number,
    indiceReajuste: String,
    tipoCliente: { type: String, enum: ['Proprietário', 'Inquilino'] },
    numeroRegistroEnel: String
});

module.exports = mongoose.model('Cliente', clienteSchema);
