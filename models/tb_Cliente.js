// Import de bibliotecas
const { sq } = require("./conn");
const { DataTypes } = require("sequelize");

// Criação da Tabela Cliente
const Cliente = sq.define(
    "Cliente", {
        Nome: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
            unique: true
        },
        Senha: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        }
    }
);

// Exportação do Model Cliente
module.exports = Cliente;
