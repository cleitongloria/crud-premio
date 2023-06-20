'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('avaliadors', { 
      id:{ 
        type:Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf:{
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('avaliadors');
     
  }
};