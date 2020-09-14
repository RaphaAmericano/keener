const { update } = require('../models/Produto');
const Produto = require('../models/Produto');

module.exports = {
    async index(req, res){
        const produtos = await Produto.findAll();
        return res.status(200).json(produtos);
    },
    async store(req, res) {
        const { nome, quantidade } = req.body;
        const produto = Produto.create({ nome, quantidade });
        return res.status(201).json(produto);
    },
    async delete(req, res){
        const { id } = req.params;
        const produto = await Produto.destroy({
            where: { id }
            }
        );
        return res.status(204).json(produto);
    },
    async update(req, res) {
        const { id } = req.params;
        const { nome, quantidade } = req.body;
        const produto = await Produto.update({
            nome,
            quantidade
        },
        {
            where: { id }
        });
        return res.status(204).json(produto);
    }  
}