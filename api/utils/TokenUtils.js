const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
module.exports = {
    async gerarToken(parametros){
        return jwt.sign(parametros, authConfig.secret, {
            expiresIn: 86400
        });
    },
    async hashSenha(senha){
        return await bcryptjs.hash(senha, 10);
    }
}