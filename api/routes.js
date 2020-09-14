const express = require('express');
const routes = express.Router();

const ProdutoController = require('./controllers/ProdutoController');
const UsuarioController = require('./controllers/UsuarioController');
const MovimentacaoController = require('./controllers/MovimentacaoController');
const AuthController = require('./controllers/AuthController');


routes.get('/', (req, res) => {
    return res.send('OK no routes')
});

routes.get('/usuarios', UsuarioController.index);
routes.get('/usuarios/:id', UsuarioController.findById);
routes.post('/usuarios/novo', UsuarioController.store);
routes.delete('/usuarios/delete/:id', UsuarioController.delete);
routes.put('/usuarios/update/:id', UsuarioController.update);

routes.get('/produtos', ProdutoController.index);
routes.post('/produtos/novo', ProdutoController.store);
routes.delete('/produtos/delete/:id', ProdutoController.delete);
routes.put('/produtos/update/:id', ProdutoController.update);
routes.patch('/produtos/quantidade/:id', ProdutoController.updateQuantidade);

routes.get('/movimentacoes', MovimentacaoController.index);
routes.post('/movimentacoes/novo', MovimentacaoController.store);

routes.post('/auth', AuthController.authenticate);
routes.post('/forgot_senha', AuthController.forgotSenha);
routes.post('/reset_senha', AuthController.resetSenha);

module.exports = routes;