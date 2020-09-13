const { Model, DataTypes } = require('sequelize');

class Movimentacao extends Model {
    static init(connection){
        super.init({
            id_usuario: DataTypes.INTEGER,
            id_produto: DataTypes.INTEGER,
            quantidade: DataTypes.INTEGER,
        }, {
            sequelize: connection
        })
    }
    static associate(models){
        this.hasOne(models.Usuario, { foreignKey:'id', as:'usuario' });
        this.hasOne(models.Produto, { foreignKey: 'id', as: 'produto'})
    }
}
module.exports = Movimentacao;