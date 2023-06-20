'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
  
    await queryInterface.createTable('projetos_autors', {
     id: {
       type:Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     projeto_id: {
       type: Sequelize.INTEGER,
       references: {
         model: 'projetos',
         key: 'id'
       },
       onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
     },
     autor_id: {
       type: Sequelize.INTEGER,
       references: {
         model: 'autors',
         key: 'id'
       },
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
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
      await queryInterface.dropTable('projetos_autors');
  
 }
};
