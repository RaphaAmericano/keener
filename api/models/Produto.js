const { Model, DataTypes } = require('sequelize');
const DataUtils = require('../utils/DataUtils');
class Produto extends Model {
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            quantidade: DataTypes.INTEGER
        },
        {
            sequelize: connection
        }
        ).beforeCreate((produto, options) => {
            produto.nome = DataUtils.stringFirstUppercase(produto.nome);
        })
    }
}
module.exports = Produto;