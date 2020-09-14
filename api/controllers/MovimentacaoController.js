const Movimentacao = require('../models/Movimentacao');
module.exports = {
    async index(req, res) {
        const movimentacoes = await Movimentacao.findAll();
        return res.status(200).json(movimentacoes);
    },
    async store(req, res) {
        const { id_usuario, id_produto, quantidade, tipo } = req.body;
        const movimentacao = await Movimentacao.create({
            id_usuario,
            id_produto,
            quantidade,
            tipo
        });
        return res.status(201).json(movimentacao);
    }
}