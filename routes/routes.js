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
            res.render("index", {
                Usuario: req.user
            });
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
        failureRedirect: '/login',
        failureFlash: true
    }));

    // Minha conta
    app.get('/usuario/minha_conta', checkNotAuthenticated, (req, res) => {
        if (req.isAuthenticated()) {
            const { Nome, Email, Senha } = req.user;
            res.render('minhaConta', { Cliente: { Nome, Email, Senha} });
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

    app.post('/usuario/alterar', async (req, res) =>{

        // Pega a senha antiga do corpo
        const SenhaAntiga = req.body.senha_atual_user;

        // Procurar o cliente no banco de acordo com o e-mail
        const Data = await Cliente.findOne({
            where: {
                'Email': req.body.Email
            }
        })

        // Verificar a equivalência das senhas
        const isMatch = await bcrypt.compare(SenhaAntiga, Data.Senha);

        // Se for igual
        if (isMatch){
            
            // Pegar a senha nova do corpo
            const SenhaNova = req.body.senha_user

            // Realizar a criptografia da senha nova
            let hashSenha = await bcrypt.hash(SenhaNova, 10);

            // Realiza a atualização de dados
            Cliente.update({
                Nome: req.body.nome_user,
                Email: req.body.Email,
                Senha: hashSenha
            },{
                where: {
                    id: Data.id
                }
            })
            .then(() => {
                req.flash('success_msg', "Atualização realizada com sucesso!")
                res.redirect('/login')
            
            })
            .catch((error) => {
                console.log(error)
            })

        }
        // Se a senha for diferente
        else{
            req.flash('error_msg', "As senhas não conferem!")
            res.redirect('/usuario/minha_conta');
        }

    })
    
    // Verificação de Autenticação
    function checkNotAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }

        res.redirect('/login')
    }

    

// Fim das Configurações de Rotas (Back-End)