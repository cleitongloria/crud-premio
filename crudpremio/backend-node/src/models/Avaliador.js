const { Model, DataTypes } = require('sequelize');

class Avaliador extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Avaliacao, {
      foreignKey: 'avaliador_id',
      as: 'avaliacoes',
    });
  }
}

module.exports = Avaliador;