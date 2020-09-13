const { Model, DataTypes } = require('sequelize');

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
        })
    }
}

module.exports = Usuario;