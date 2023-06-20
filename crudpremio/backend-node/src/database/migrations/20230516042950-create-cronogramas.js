'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cronogramas', {
     id:{
       type:Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     data_inicio:{
       type: Sequelize.DATE,
       allowNull: false
     },
     descricao:{
       type: Sequelize.STRING,
       allowNull: false
     },
     data_fim:{
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
     }
   });
   
 },


 async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cronogramas');
   
 }
};
