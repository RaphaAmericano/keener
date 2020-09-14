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
    },
    async updateQuantidade(req, res){
        const { id } = req.params;
        const { quantidade, tipo } = req.body;
        console.log(req.body);
        console.log(quantidade);
        console.log(tipo);
        if(tipo){
            await Produto.increment({
                quantidade 
            }, 
            {   by: quantidade,
                where: { id }
            }).then(
                resultado => {
                    console.log(resultado)
                    return res.status(204).json({mensagem: 'Quantidade atualizada com sucesso'})
                }
            ).catch(
                error => res.status(400).json({ error: 'Não foi possível atualizar a quantidade do produto.'})
            )
        } else {
            await Produto.decrement({
                quantidade: quantidade 
            }, 
            {   by: quantidade,
                where: { id }
            }).then(
                resultado => {
                    console.log(resultado)
                    return res.status(204).json({mensagem: 'Quantidade atualizada com sucesso'})
                }
            ).catch(
                error => res.status(400).json({ error: 'Não foi possível atualizar a quantidade do produto.'})
            )
        }
    }  
}