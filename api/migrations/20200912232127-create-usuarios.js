'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', { 
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false
      },
      token:{
        type: Sequelize.STRING,
        allowNull: true
      },
      token_expires:{
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
       type: Sequelize.DATE,
       allowNull: false
     }
      
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.dropTable('usuarios');
     
  }
};
