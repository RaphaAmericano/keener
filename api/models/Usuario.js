const { Model, DataTypes } = require('sequelize');
const TokenUtils = require('../utils/TokenUtils');
const DataUtils = require('../utils/DataUtils');
class Usuario extends Model {
    static init(connection){
        super.init({
            nome:DataTypes.STRING,
            email:DataTypes.STRING,
            senha:DataTypes.STRING,
            token:DataTypes.STRING,
            token_expires:DataTypes.DATE,
        }, {
            sequelize: connection
        }).afterValidate( (usuario, options) => {
            usuario.nome = DataUtils.stringFirstUppercase(usuario.nome);
        }).beforeCreate( async (usuario, options) => {
            usuario.senha = await TokenUtils.hashSenha(usuario.senha);
        })
    }
}

module.exports = Usuario;