const { Model, DataTypes } = require('sequelize');
const Projeto = require('./Projeto');

class Autor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        telefone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  // static associate(models) {
  //   this.belongsToMany(models.Projeto, {
  //     through: 'projetos_autors',
  //     foreignKey: 'autor_id',
  //     as: 'projetos',
  //   });
  // }
  static associate(models) {
    this.belongsToMany(models.Projeto, {
      through: 'projetos_autors',
      foreignKey: 'autor_id',
      otherKey: 'projeto_id',
      as: 'projetos',
    });
  }
}

module.exports = Autor;
