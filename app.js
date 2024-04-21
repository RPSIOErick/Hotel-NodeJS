// Importação de Dependências
    // Import Express
    const express = require('express')

    // Import Handlebars
    const handlebars = require('express-handlebars').engine
    
    // Import bodyParser
    const bodyParser = require('body-parser')

// Fim das Importações

// Instância do Express
const app = express()

// Configuração da View Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))

    // Utilização da View Engine
    app.set("view engine", "handlebars")

// Configuração do Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



// Importação de outros arquivos

// ...

// Fim da importação de outros arquivos


// Configuração de Rotas

    // Rotas Principais
    app.get("/", function(res, req){
        res.render("index")
    })

// Fim da Configuração de Rotas

// Inicialização do Servidor
app.listen(8081, function(){

    console.log("Servidor rodando na url http://localhost:8081")

})