'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {
   await queryInterface.createTable('avaliacaos', {
    id:{
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
    premio_id: {
     type: Sequelize.INTEGER,
     references: {
       model: 'premios',
       key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
   },
    avaliador_id: {
     type: Sequelize.INTEGER,
     references: {
       model: 'avaliadors',
       key: 'id'
     },
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE'
   },
   parecer:{
     type: Sequelize.STRING,
     allowNull: false,
   },
   nota:{
    type: Sequelize.FLOAT,
    allowNull: false,
   },
    data_avaliacao:{
     type: Sequelize.DATE,
     allowNull: false,
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
   await queryInterface.dropTable('avaliacaos');
 
}
};
