const { Model, DataTypes } = require('sequelize');
const Cronograma = require('./Cronograma');

class Premio extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        descricao: DataTypes.STRING,
        ano: DataTypes.BIGINT,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Cronograma, {
      foreignKey: 'cronograma_id',
      as: 'cronograma',
    });
    this.hasMany(models.Avaliacao, {
      foreignKey: 'premio_id',
      as: 'avaliacoes',
    });
  }
}

module.exports = Premio;