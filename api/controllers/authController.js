const express = require('express');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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
        await usuarios.selectUsuarioEmail(usuario.email).then(
            resultado => {
                if(resultado.resultado.length > 0){
                    throw new Error( 'Email já cadastrado');
                }
            }
        ).catch(
            error => {
                throw error;
            }
        );
    } catch(err) {
        return res.status(400).send({ error: `Ocorreu um erro ao registrar o usuário. Tente novamente.`, tipo: err.message })
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
            error => {
                console.warn('Error:', error);
                throw new Error({ error });
            }
        )
        delete usuario.password;
        usuario.id_usuario = retorno.resultado.insertId;
        return res.status(201).send({ 
            user: usuario,
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
            resultado => {
                user = resultado.resultado[0]
                if(user === undefined){
                    throw new Error('Usuário não encontrado')
                }
            }
        ).catch(
            error => {  throw error.message }
        );
    } catch(err) {
        console.log(err);
        return res.status(400).send(err)
    } 
    // verifica a senha encryptada
    if(!await bscrypt.compare(password, user.senha )) return res.status(400).send( 'Password invalido');
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
            resultado => {
                user = resultado.resultado[0]
            }
        ).catch(
            error => res.status(400).send({ error: 'Usuário não encontrado'})
        );
        
        const token = await crypto.randomBytes(20).toString('hex');
        let agora = new Date();
        agora.setHours(agora.getHours() + 1 );
        // agora = agora.toISOString().slice(0, 19).replace('T', ' ');
        
        //Funcao para preencher e disparar o email com o token para renovacao de senha
        await usuarios.updateUsuarioToken(token, agora, user.id_usuario ).then(
            resultado => {
                mailer.sendMail({
                    to: email,
                    from: 'raphael@raphaelamericano.com.br',
                    subject: 'Alteração de senha',
                    template:'forgot_password',
                    context: { token }
                },(err, resultados) => {
                    if(err)
                    {  
                        return res.status(400).send({ error: 'Não foi possivel enviar o email de recuperação de senha'})
                    };
                    return res.status(200).send({ mensagem: `Email de recuperação de senha enviado para ${resultados.envelope.to[0]} com sucesso`});
                })
            }
        ).catch(
            err => console.log(err)
        )
    } catch (error) {
        res.status(400).send({ error: 'Erro ao buscar password esquecido, tente novamente'})
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, senha } = req.body;
    let user = undefined;
    try {
        //Busca o usuario pelo email
        await usuarios.selectUsuarioEmail(email).then(
            resultado => user = resultado.resultado[0]
        ).catch(
            error => {
                console.warn('Error: ', error);
                return res.status(400).send({ error: 'Usuário não encontrado' })
            }
        )
        // TODO: fazer um try catch para cada promise 
        //verifica o se o token é valido
        if(token !== user.token){
            return res.status(400).send({ error: 'Token invalido'})
        }
        // Verifica se o token expirou
        const agora = new Date();
        if(agora > user.token_expires){
            return res.status(400).send({ error: 'Token expirou'})
        }
        // encrypta a nova senha
        const hash = await bscrypt.hash(senha, 10 );
        // faz o update da nova senha no banco
        await usuarios.updateSenha(hash, user.id_usuario).then(
            resultado => {
                return res.status(200).send({ mensagem: 'Senha alterada com sucesso'}) 
            }
        ).catch(
            error => console.log('Error: ', error)
        )
        
    } catch (error) {
        console.log(error);
        res.status(400).send({error: 'Não foi possível alterar sua senha. Tente novamente'})
    }

})

module.exports = app => app.use('/auth', router);