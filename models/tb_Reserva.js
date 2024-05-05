// Import da Biblioteca
const { sq } = require("./conn");
const { DataTypes } = require("sequelize");

// Criação da Model Reserva
const Reserva = sq.define(
    "Reserva", {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            field: 'id'
        },
        Quarto: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false,
        },        
        Qntd_Pessoas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        Chegada: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            primaryKey: false
        },
        Partida: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            primaryKey: false
        },
        Valor: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            primaryKey: false
        },
        Observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
            primaryKey: false
        }
    }
    
);

// Exportação da Model Reserva
module.exports = Reserva;
