const { express, handlebars, bodyParser, path } = require("./imports.js")

// Instância do Express
    const app = express()

// Configuração da View Engine
    app.use(express.static('public'));
    
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
    }))

    // Utilização da View Engine
        app.set("view engine", "handlebars")

    // Pasta padrao de views
        app.set('views', path.join(__dirname, '../views'));

    // Pasta padrao de css
        app.use(express.static(path.join(__dirname, '../public')));

// Configuração do Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())


module.exports = { app }