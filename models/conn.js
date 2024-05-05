// Import da biblioteca Sequelize
const Sequelize = require('sequelize')

// Conexão com o banco de dados
const sequelize = new Sequelize('BD_HOTEL', 'postgres', 'Edward123', {
    host: 'localhost',
    dialect: 'postgres'
})

// Teste da Conexão
const testConn = async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexão feita com sucesso");
    }
    catch(error){
        console.error("Não foi possível se conectar ao banco de dados: ", error);
    }
}

// Exportação dos módulos
module.exports = {
    sq: sequelize, testConn
}