const routes = require('./routes/routes');
const config = require('./routes/config');

PORT = 8080;

config.app.listen(PORT, (req, res) => {
    console.log('Servidor rodando na porta: ' + PORT);
})