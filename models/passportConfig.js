// Lib de autenticação
const LocalStrategy = require('passport-local').Strategy;

const { bcrypt, passport } = require("../routes/imports.js");

const { app } = require('../routes/config.js');

const Cliente = require('./tb_Cliente.js');

function initialize(passport) {

    // Função de Autenticação
    const authenticateUser = async (Email, Senha, Feito) => {
        try {

            // Procurando por Email que é informado no formulário
            const user = await Cliente.findOne({ where: { 'Email': Email } });

            // Caso não tenha um user...
            if (!user) {
                return Feito(null, false, { mensagem: "Usuário não encontrado!" });
            }

            // Constante para verificar se as senhas informadas são iguais
            const isMatch = await bcrypt.compare(Senha, user.Senha);

            // Caso as senhas sejam iguais...
            if (isMatch) {
                return Feito(null, user);

            // Caso as senhas não sejam iguais...
            } else {
                return Feito(null, false, { mensagem: "Senha incorreta!" });
            }
        
        // Caso ocorra algum erro na função de autenticação...
        } catch (error) {
            return Feito(error);
        }
    };
    
    // Configuração do Passport
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'Email',
                passwordField: 'Senha'
            },
            authenticateUser
        )
    );

    // Função de Serialização
    passport.serializeUser((user, Feito) => Feito(null, user.id));

    // Função de Deserialização
    passport.deserializeUser(async (id, Feito) => {
        try {
            const user = await Cliente.findByPk(id);
            Feito(null, user);
        } catch (error) {
            Feito(error);
        }
    });
}

// Exportação da função de inicialização
module.exports = initialize;
