'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projetos', {
     id:{
       type:Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     area:{
       type: Sequelize.STRING,
       allowNull: false
     },
     titulo:{
       type: Sequelize.STRING,
       allowNull: false
     },
     resumo:{
      type: Sequelize.STRING,
      allowNull: false
    },
     data_envio:{
      type: Sequelize.DATE,
      allowNull: false
    },
     created_at:{
       type: Sequelize.DATE,
       allowNull: false,
     },
     updated_at:{
       type: Sequelize.DATE,
       allowNull: false,
     },
   });
   
 },
 async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projetos');
   
 }
};
