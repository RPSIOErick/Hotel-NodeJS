const { ActivityHandler } = require('botbuilder');

// Texto padrão inicial
    const greeting = 'Olá, eu sou a Ana, como posso te ajudar hoje?'
// Perguntas que o bot é capaz de responder
    const questions = 
    [
        "Onde fica localizado Hotel Hotel?",
        "Qual o horario de funcionamento da recepção do Hotel?",
        "Quais são os tipos de quarto disponiveis?",
        "Como faço minha reserva?",
        "Como faço para falar com o hotel?"
    ]

// Repostas as perguntas
    const answers =
    [
        "O hotel tem apenas uma unidade, localizada na Rua  Rua Carlos Sampaio, 100, no bairro da Bela Vista, em São Paulo, SP.",
        "A recepção funciona das 08h as 19h todos os dias.",
        `Os tipos de quarto disponiveis são: 
        <br><br>
            Quarto Luxo: 600,00/Noite <br>
            Descrição: Observe e se agracie em vistas maravilhosas que o Hotel Hotel disponibiliza. Sempre pensando em você!<br><br>

            Quarto de Casal: 400,00/Noite <br>
            Descrição: Venha passar seus momentos mais românticos nos quartos para casais. Sinta o conforto máximo!<br><br>

            Quarto de Familia: 500,00/Noite <br>
            Descrição: Traga sua família e se aconchegue no conforto que o quarto oferece. Aprecie o conforto em conjunto!

        `,
        "A reserva pode ser feita pelo site na pagina de Reservas, pelo telefone +55 11 95325-9340, ou presencialmente na recepção do hotel",
        "Você pode nos contatar pelo telefone +55 11 95325-9340, ou presencialmente pela recepção"

    ]

// Classe Bot (Padrão Empty pela instalação)
    class AnaBot extends ActivityHandler 
    {

        // Construtor, onde fica a configuração para requisitar e receber mensagens
            constructor() 
            {
                super();

                // Mostra o texto padrão inicial
                    this.onMembersAdded(async (context, next) => 
                    {
                        const membersAdded = context.activity.membersAdded;
                        for (let cnt = 0; cnt < membersAdded.length; ++cnt) 
                        {
                            if (membersAdded[cnt].id !== context.activity.recipient.id) 
                            {
                                await context.sendActivity(greeting);
                            }
                        }

                        // By calling  you ensure that the next BotHandler is run.
                        await next();
                    });
                
                // Configura mensagens para perguntas especificas
                    this.onMessage(async (context, next) => 
                    {
                        // Recebe oque o usuario escreveu
                            const text = context.activity.text;

                        // Verifica se a mensagem é uma das perguntas existentes
                            for (let i = 0; i < questions.length; i++) 
                            {
                                if(text == questions[i])
                                {
                                    await context.sendActivity(answers[i]);
                                } 
                            }

                        // By calling  you ensure that the next BotHandler is run.
                        await next();
                    })
            }
    }

module.exports.AnaBot = AnaBot;
module.exports = {questions, answers}