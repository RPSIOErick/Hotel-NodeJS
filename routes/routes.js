// Importação do Express
    const { app } = require("./config.js")

// Importações Ana Bot
    const { questions, answers} = require("../bot/ana/bot.js")

// Importação de Configs
    const { bcrypt, passport, bodyParser } = require("./imports.js")

// Configuração de Rotas (Front-End)

    // Home
        app.get("/", function(req, res)
        {
            res.render("index");
        })

    // Rotas do Bot
        app.get('/Ana', function(req, res)
        {
            res.render(
                "ana",
            );
        })

        // Rota para enviar perguntas e receber resposta
            app.post("/Ana/Resposta", async function(req, res) 
            {
                const pergunta = req.body.pergunta;
                let resposta = "Desculpe, não tenho resposta para essa pergunta.";

                // Verificar se a pergunta é uma das perguntas definidas
                    for (let i = 0; i < questions.length; i++) 
                    {
                        if (pergunta === questions[i]) 
                        {
                            resposta = answers[i];
                            break;
                        }
                    }

                res.json({ resposta }); // Retornar a resposta como JSON
            });
    // Fim das rotas do Bot

    // Login
        app.get("/login", function(req, res)
        {
            res.render("login")
        })

    // Cadastrar
        app.get("/cadastrar", function(req, res)
        {
            res.render("cadastrar")
        })

    // Visualizar quartos
        app.get("/quartos", function(req, res)
        {
            res.render("quartos")
        })

    // Reservar

        // Luxo
            app.get("/reservar_luxo", function(req, res)
            {
                res.render("reservar_luxo")
            })

        // Casal
            app.get("/reservar_casal", function(req, res)
            {
                res.render("reservar_casal")
            })

        // Familia
            app.get("/reservar_familia", function(req, res)
            {
                res.render("reservar_familia")
            })

    // Fim do Reservar

// Fim da Configuração de Rotas (Front-End)

// Configuração de Rotas (Back-End)

    // Import da Model Cliente
    const Cliente = require('../models/tb_Cliente.js');


    // Rota de Cadastro
    app.post('/usuario/cadastrar', async (req, res) => {

        // Array de erros
        let erros = [];
    
        // Se nenhum campo tiver valor...
        if (!req.body.Nome || !req.body.Email || !req.body.Senha1 || !req.body.Senha2) {
            erros.push({mensagem: "Preencha todos os campos!"})
        }
    
        // Se a senha não tiver no mínimo 6 caracteres...
        if (req.body.Senha1.length < 6) {
            erros.push("A senha deve ter no mínimo 6 caracteres!")
        }
    
        // Se a senha não for igual a confirmação da senha
        if (req.body.Senha1 !== req.body.Senha2) {
            erros.push("As senhas não conferem!")
        }
    
        // Se houver algo no array de erros...
        if (erros.length > 0) {
        
            res.render('cadastrar', {erros})
    
        } else {
    
            // Formulário Validado!
    
            let Senha1 = req.body.Senha1;
    
            let hashSenha = await bcrypt.hash(Senha1, 10);
    
            let ConfirmCliente = await Cliente.findOne({
                where: {
                    'Email': req.body.Email
                }
            })
    
            if(ConfirmCliente){
                erros.push({mensagem: "E-mail já cadastrado! Entre pelo link no rodapé."})
                res.render('cadastro', {erros})
            }
            else {
                Cliente.create({
                    Nome: req.body.Nome,
                    Email: req.body.Email,
                    Senha: hashSenha
                })
                .then(() => {
                    req.flash('success_msg', "Cadastro realizado com sucesso!")
                    res.redirect('/login')
                
                })
                .catch((error) => {
                    console.log(error)
                })
            }
    
        }
    
    });

    // Rota de Login
    app.post('/usuario/login', passport.authenticate('local', {
        successRedirect: '/usuario/minha_conta',
        failureRedirect: '/usuario/entrar',
        failureFlash: true
    }));

    // Minha conta
    app.get('/usuario/minha_conta', checkNotAuthenticated, (req, res) => {
        if (req.isAuthenticated()) {
            const { Nome, Email } = req.user;
            res.render('minhacontaTeste', { Cliente: { Nome, Email } });
        } else {
            res.redirect('/login');
        }
    });

    // Logout
    app.get('/usuario/sair', (req, res) => {
    
        req.logout(function(err) {
            if(err) {
                // Trate o erro, se houver
                console.log(err);
            }
            // Adicione a mensagem de sucesso como flash
            req.flash('success_msg', "Deslogado com sucesso!")
    
            // Redirecione o usuário para a página de login
            res.redirect('/login');
    
        });
    
    });
    
    // Verificação de Autenticação
    function checkNotAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }

        res.redirect('/login')
    }

    

// Fim das Configurações de Rotas (Back-End)