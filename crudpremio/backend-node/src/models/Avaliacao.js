const { Model, DataTypes } = require('sequelize');
const Projeto = require('./Projeto');
const Premio = require('./Premio');
const Avaliador = require('./Avaliador');

class Avaliacao extends Model {
  static init(sequelize) {
    super.init(
      {
        parecer: DataTypes.STRING,
        nota: DataTypes.FLOAT,
        data_avaliacao: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Projeto, {
      foreignKey: 'projeto_id',
      as: 'projeto',
    });
    this.belongsTo(models.Premio, {
      foreignKey: 'premio_id',
      as: 'premio',
    });
    this.belongsTo(models.Avaliador, {
      foreignKey: 'avaliador_id',
      as: 'avaliador',
    });
  }
}

module.exports = Avaliacao;