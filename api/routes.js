const express = require('express');
const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController')


routes.get('/', (req, res) => {
    return res.send('OK no routes')
});

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios/novo', UsuarioController.store);

module.exports = routes;