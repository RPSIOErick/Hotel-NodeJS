// Requisita a classe AnaBot
const { AnaBot } = require('./bot');

// Importa módulos do Bot Framework
const 
{
    CloudAdapter, // Adaptador para gerenciar a comunicação entre o bot e o serviço do Bot Framework
    ConfigurationServiceClientCredentialFactory, // Para configurar credenciais do bot
    createBotFrameworkAuthenticationFromConfiguration // Para criar autenticação usando as credenciais configuradas
} = require('botbuilder');

// Cria uma fábrica de credenciais usando variáveis de ambiente
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MicrosoftAppId, // ID do aplicativo Microsoft
    MicrosoftAppPassword: process.env.MicrosoftAppPassword, // Senha do aplicativo Microsoft
    MicrosoftAppType: process.env.MicrosoftAppType, // Tipo de aplicativo Microsoft
    MicrosoftAppTenantId: process.env.MicrosoftAppTenantId // ID do inquilino para autenticação multi-tenant
});

// Cria autenticação para o Bot Framework usando as credenciais configuradas
const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);

// Cria um adaptador para o Bot Framework com autenticação
const adapter = new CloudAdapter(botFrameworkAuthentication);

// Define o comportamento em caso de erro não tratado durante uma interação com o bot
adapter.onTurnError = async (context, error) => 
{
    console.error(`\n [onTurnError] unhandled error: ${ error }`); // Exibe o erro no console para depuração

    // Envia uma atividade de rastreamento para o Bot Framework com informações do erro
    await context.sendTraceActivity(
        'OnTurnError Trace', // Nome do evento de rastreamento
        `${ error }`, // Informações sobre o erro
        'https://www.botframework.com/schemas/error', // Schema para rastreamento de erros
        'TurnError' // Nome do tipo de erro
    );

    // Envia uma mensagem ao usuário informando que ocorreu um erro
        await context.sendActivity('The bot encountered an error or bug.');
    // Sugere ao usuário que o código-fonte do bot precisa ser corrigido para evitar erros futuros
        await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Cria uma instância do bot usando a classe AnaBot
const anaBot = new AnaBot();

// Exporta a instância do bot para ser utilizada em outros módulos
module.exports = { anaBot, adapter };

