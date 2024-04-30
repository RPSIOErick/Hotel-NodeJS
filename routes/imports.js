// Importação de Dependências

    // Import Express
        const express = require('express')

    // Import Handlebars
        const handlebars = require('express-handlebars').engine

    // Import bodyParser
        const bodyParser = require('body-parser')

    // Import Path
        const path = require('path');

    // Import bcrypt (Biblioteca de Criptografia)
    const bcrypt = require('bcrypt');

    // Import session (Express)
    const session = require('express-session');

    // Import flash (Express)
    const flash = require('express-flash');

    // Import passport
    const passport = require('passport');

// Fim das Importações

module.exports = {express, handlebars, bodyParser, path, bcrypt, session, flash, passport}