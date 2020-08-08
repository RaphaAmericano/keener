const express = require('express');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../config/auth');
const router = express.Router();
const database = require('../database/database');
const usuarios = require('../models/usuarios');

const gerarToken = (parametros) => {
    return jwt.sign( parametros ,  authConfig.secret, {
        expiresIn: 86400
    } )
}

router.get('/usuarios', async (req, res ) => {
    try {
        let retorno = undefined;
        await usuarios.selectAllUsuarios().then(
            resultado => retorno = resultado 
        ).catch(
            error => console.log('catch:', error)
        )
        return res.status(200).send(retorno);
    } catch(error){
        return res.status(500).send(error);
    }
})

router.post('/register', async (req, res) => {
    const usuario = req.body;
    // verifica a existencia de emails ja cadastrados        
    try {
        usuarios.selectUsuarioEmail(usuario.email).then(
            resultado => console.log(resultado)
        ).catch(
            error => console.warn('Error:', error)
        );
    } catch(err) {
        return res.status(400).send({ error: 'Email já cadastrado'})
    } 
    // executa a insert no banco
    try {
        //encrypta o password e atribui ao objeto
        const hash = await bscrypt.hash(usuario.password, 10 );
        usuario.password = hash;
        let retorno = undefined;
        //executa a query
        await usuarios.insertUsuario(usuario).then(
            resultado => retorno = resultado
        ).catch (
            error => console.warn('Error:', error)
        )
        
        return res.status(201).send({ 
            usuario: usuario,
            retorno: retorno,
            token: gerarToken({ id: retorno.resultado.insertId })
        });
    } catch (err){
        return res.status(400).send({ error: 'Falha no registro' })
    }
});

router.post('/authenticate', async (req, res ) => {
    const { email, password } = req.body;
    let user;
    //busca o usuario pelo email
    try {
        await usuarios.selectUsuarioEmail(email).then(
            resultado => user = resultado.resultado[0]
        ).catch(
            error => console.warn('Error:', error)
        );
    } catch(err) {
        return res.status(400).send({ error: 'Usuário não encontrado'})
    } 
    // verifica a senha encryptada
    if(!await bscrypt.compare(password, user.senha )) return res.status(400).send({ error: 'Password invalido'});
    // limpa a senha do objeto para retornar
    user.senha = undefined;
    //
    res.status(200).send({ user, token: gerarToken({ id: user.id_usuario })  } );
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    let user = undefined;
   
    try {
        // buscar o usuario pelo email
        await usuarios.selectUsuarioEmail(email).then(
            resultado => user = resultado.resultado[0]
        ).catch(
            error => res.status(400).send({ error: 'Usuário não encontrado'})
        );
        
        const token = crypto.randomBytes(20).toString('hex');
        const agora = new Date();
        agora.setHours(agora.getHours() + 1 );

    } catch (error) {
        res.status(400).send({ error: 'Erro ao buscar password esquecido, tente novament'})
    }

})

module.exports = app => app.use('/auth', router);