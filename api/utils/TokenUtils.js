const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

module.exports = {
    async gerarToken(parametros){
        console.log(parametros);
        return jwt.sign(parametros, authConfig.secret, {
            expiresIn: 86400
        });
    }
}