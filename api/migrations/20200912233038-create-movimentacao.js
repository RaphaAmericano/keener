'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('movimentacoes', { 
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'usuarios',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'produtos',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tipo: {
        type:Sequelize.BOOLEAN,
        allowNull: false
      },
      horario:{
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
     
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movimentacoes');
  }
};
