const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');
const TokenUtils = require('../utils/TokenUtils');

module.exports = {
    async authenticate(req, res ){ 
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        
        if(!usuario){
            return res.status(404).json({ error: "Email não encontrado."})
        }
        
        if(!await bcryptjs.compare(senha, usuario.senha)){
            return res.status(404).json({error: 'Senha incorreta'})
        }

        return res.status(200).json(usuario);
    },
    async forgotPassword(req, res){
        const { email } = req.body;
        const urlPath = `http://localhost:4200`;
        const usuario = await Usuario.findOne({
            where: {
                email
            }
        });
        if(!usuario){
            return res.status(404).json({error: `Email ${email} não foi encontrado.`});
        }
        const token = await crypto.randomBytes(20).toString('hex');
        let now = new Date();
        now.setHours(now.getHours() + 1 );

        await Usuario.update({ 
            token, 
            token_expires: now
            }, {
                where: {
                    email
                }
        }).then(
            success => {
                mailer.sendMail({
                    to: email,
                    from: 'raphael@raphaelamericano.com.br',
                    subject: 'Alteração de senha',
                    template:'forgot_password',
                    context: { urlPath, token }
                }, (error, result) => {
                    if(error){
                        return res.status(400).send({error: 'Não foi possível o email de recuperação de senha'});
                    }
                    return res.status(200).send({ success: `Email de recuperação de senha enviado para ${result.envelope.to[0]} com sucesso`})
                })
            }
        ).catch(
            error => res.status(400).json({ error: 'Não foi possível atualizar o token' }) 
        );

    }
}