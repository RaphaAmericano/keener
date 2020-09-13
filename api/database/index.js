const Sequelize = require('sequelize');
const config = require('./config');

const Produto = require('../models/Produto');
const Usuario = require('../models/Usuario');
const Movimentacao = require('../models/Movimentacao');

const connection = new Sequelize(config);


Produto.init(connection);
Usuario.init(connection);
Movimentacao.init(connection);

// Produto.associate(connection.models);
// Usuario.associate(connection.models);
Movimentacao.associate(connection.models);

module.exports = connection;