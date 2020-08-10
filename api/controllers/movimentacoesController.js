const express = require('express');
const authMiddleware = require('../middlewares/auth');
const movimentacoes = require('../models/movimentacoes');
const produtos = require('../models/produtos');

const router = express.Router();

router.use(authMiddleware);

router.get('/',  (req, res) => {
    res.status(200).send({ mensagem: "ok" })
})

router.get('/all', async (req, res) => {
    try {
        await movimentacoes.selectAllMovimentacoes().then(
            resultado => res.status(200).send({ resultado })
        ).catch(
            error => res.status(400).send({ error: 'Ocorreu um erro ao buscar as movimentações'})
        )    
    } catch (error) {
        return res.status(400).send({ error: 'Ocorreu um erro ao buscar as movimentações'})
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await movimentacoes.selectMovimentacao(id).then(
            resultado => res.status(200).send({ resultado })
        ).catch(
            erro => res.status(400).send({ erro: `Ocorreu um erro ao buscar a movimentação de id ${id}`})
        )
    } catch (error) {
        return res.status(400).send({ erro: error, mensagem: 'Ocorreu um erro ao tentar buscar a movimentação' })
    }
})

router.post('/register', async (req, res) => {
    const { id_produto, id_usuario, quantidade } = req.body;
    const tipo = (quantidade >= 0) ? true : false; 
    try {
        await movimentacoes.insertMovimentacao(id_produto, id_usuario, quantidade, tipo).then(
            retorno => retorno
        ).then(
            await produtos.updateQuantidadeProduto(quantidade, id_produto).then(
                retorno => retorno
            ).catch(
                erro => res.status(400).send({ mensagem: 'Erro ao atualizar a quantidade'})
            )
        ).then(
            retorno => res.status(201).send({ mensagem: 'Movimentação registrada com sucesso', resultado: retorno})
        ).catch(
            erro => res.status(400).send({ mensagem: 'Ocorreu um erro ao registrar a movimentação', erro: erro})
        )
    } 
    catch (error) {
        return res.status(400).send({ erro: 'Ocorreu um erro ao tentar registrar a movimentação'})
    }
})

module.exports = app => app.use('/movimentacoes', router);