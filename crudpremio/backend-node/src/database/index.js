const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Autor = require('../models/Autor');
const Avaliador = require('../models/Avaliador');
const Avaliacao = require('../models/Avaliacao');
const Projeto = require('../models/Projeto');
const Premio = require('../models/Premio');
const Cronograma = require('../models/Cronograma')

const connection = new Sequelize(dbConfig);

Autor.init(connection);
Avaliador.init(connection);
Avaliacao.init(connection);
Projeto.init(connection);
Premio.init(connection);
Cronograma.init(connection);

// não esquecer de associar os modelos que tem relacionamentos nesse arquivo
//pois mesmo que uma classe esteja com a configura 
Autor.associate(connection.models);
Avaliador.associate(connection.models);
Avaliacao.associate(connection.models)
Projeto.associate(connection.models);
Premio.associate(connection.models);
Cronograma.associate(connection.models);

module.exports = connection;   