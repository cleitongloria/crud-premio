const { Model, DataTypes } = require('sequelize');

class Cronograma extends Model {
  static init(sequelize) {
    super.init(
      {
        data_inicio: DataTypes.DATE,
        descricao: DataTypes.STRING,
        data_fim: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Premio, {
      foreignKey: 'cronograma_id',
      as: 'premios',
    });
  }
}

module.exports = Cronograma;