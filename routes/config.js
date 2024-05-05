const { express, handlebars, bodyParser, path, bcrypt, session, flash, passport } = require("./imports.js")

// Instância do Express
    const app = express()


    const initializePassport = require('../models/passportConfig.js');


    initializePassport(passport);
    
    // Utilização da Sessão
    app.use(session({
            secret: 'secret',
    
            resave: false,
    
            saveUninitialized: false
        })
    );
    
    // Inicialização do Passport
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Utilização do Flash
    app.use(flash());
    

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