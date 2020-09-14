const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const TokenUtils = require('../utils/TokenUtils');
module.exports = {
    async index(req, res) {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    },
    async findById(req, res) {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({error: 'Usuário não existe'});    
        } 
        return res.status(200).json(usuario);
    },
    async store(req, res) {
        
        const { nome, email, senha } = req.body;
        const existEmail =  await Usuario.findOne({
            where: {
                email
            }
        });

        if(existEmail != null){
            return res.status(409).json({ error: `O email ${email} já está cadastrado.`})
        };
        const hash = await bcryptjs.hash(senha, 10 );
        const usuario = await Usuario.create({nome, email, senha:hash });
        const token = await TokenUtils.gerarToken({ id: usuario.id});
        return res.status(201).json({usuario, token});
    },
    async delete(req, res) {
        const { id } = req.params;
        const usuario = await Usuario.destroy({
            where: { id }
        });
        return res.status(204).json(usuario);
    },
    async update(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const usuario = await Usuario.update({
            nome,
            email,
            senha
        }, {
            where: { id }
        })
        return res.status(204).json(usuario);
    }
}