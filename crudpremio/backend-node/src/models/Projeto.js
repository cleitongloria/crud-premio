const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Autor = require('./Autor');

class Projeto extends Model {
  static init(sequelize) {
    super.init(
      {
        area: DataTypes.STRING,
        titulo: DataTypes.STRING,
        resumo: DataTypes.STRING,
        data_envio: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsToMany(models.Autor, {
      through: 'projetos_autors',
      foreignKey: 'projeto_id',
      otherKey: 'autor_id',
      as: 'autores',
    });
  }
  // static associate(models) {
  //   this.belongsToMany(models.Autor, {
  //     through: 'projetos_autors',
  //     foreignKey: 'projeto_id',
  //     as: 'autores',
  //   });
  // }
}

module.exports = Projeto;