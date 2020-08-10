const express = require('express');
const authMiddleware = require('../middlewares/auth');
const produtos = require('../models/produtos');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true, user: req.userId })
});

router.get('/all', async (req, res) => {
    try {
        await produtos.selectAllProdutos().then(
            produtos => res.status(200).send({ produtos: produtos })
        ).catch(
            error => res.status(400).send({ erro: 'Ocorreu um erro ao buscar os produtos'})
        )
    } catch (error) {
        return res.status(400).send({ erro: 'Ocorreu um erro ao buscar os produtos'})
    }
})

router.post('/register', async (req, res) => {
    const { nome } = req.body;
    try {
        await produtos.insertProduto(nome).then(
            retorno => {
                console.log(retorno);
                return res.status(201).send({ mensagem: `${nome} foi registrado com sucesso.`})
            }
        ).catch(
            err => {
                console.log(err);
                return res.status(400).send({ mensagem: `Não foi possível registra ${nome}`, erro: err })
            }
        )
    } catch (error) {
        return res.status(400).send({ error: 'Ocorreu um erro ao registrar o produto'})
    }
});

router.patch('/editar/:id', async (req, res) => {
    const { nome, quantidade } = req.body;
    const id = req.params.id;
    try {
        await produtos.updateProduto(nome, quantidade, id).then(
            resultado => res.status(200).send({ resultado: resultado })
        ).catch(
            error => res.status(400).send({ erro: error, mensagem: 'Não foi possível atualizar o produto'})
        )
    } catch (error) {
        return res.status(400).send({ erro: 'Ocorreu um erro ao tentar atualizar o produto'})
    }
});

router.put('/quantidade/:id', async (req, res) => {
    const {  quantidade } = req.body;
    const id = req.params.id;
    try {
        await produtos.updateQuantidadeProduto( quantidade, id).then(
            resultado => res.status(200).send({ resultado: resultado })
        ).catch(
            error => res.status(400).send({ erro: error, mensagem: 'Não foi possível atualizar a quantidade do produto'})
        )
    } catch (error) {
        return res.status(400).send({ erro: 'Ocorreu um erro ao tentar atualizar o produto'})
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await produtos.deleteProduto(id).then(
            resultado => res.status(200).send({ mensagem: `O produto de id ${id} foi excluído com sucesso`})
        ).catch(
            error => res.status(400).send({ error: `Ocorreu um erro ao tentar excluir o produto de id ${id}` })
        )
    }catch(error) {
        return res.status(400).send({ erro: 'Ocorreu um erro ao tentar excluir o produto' })
    }
})

module.exports = app => app.use('/produtos', router);