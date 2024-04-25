// Importação do Express
    const { app } = require("./config.js")

// Importações Ana Bot
    const { questions, answers} = require("../bot/ana/bot.js")

// Configuração de Rotas

    // Servidor
        app.listen(8081, function()
        {
            console.log("Servidor rodando na url http://localhost:8081")
        })
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

    // Minha conta
        app.get("/minha-conta", function(req, res)
        {
            res.render("minhaConta")
        })

    // Login
        app.get("/login", function(req, res)
        {
            res.render("login")
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

    

// Fim da Configuração de Rotas