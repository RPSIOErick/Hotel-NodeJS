// Import Sequelize
const Sequelize = require('sequelize')

// Configuração de Bancos
const sequelize = new Sequelize("Hotel", "root", "", {

    host: "localhost",
    dialect: "postgres"
    
})

// Exportação de variáveis
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}