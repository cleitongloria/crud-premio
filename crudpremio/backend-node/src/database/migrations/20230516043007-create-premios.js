'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {
   await queryInterface.createTable('premios', {
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
    descricao:{
      type: Sequelize.STRING,
      allowNull: false
    },
    cronograma_id: {
     type: Sequelize.INTEGER,
     references: {
       model: 'cronogramas',
       key: 'id'
     },
     onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    },
    ano:{
      type: Sequelize.BIGINT,
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
   await queryInterface.dropTable('premios');
 
}
};
