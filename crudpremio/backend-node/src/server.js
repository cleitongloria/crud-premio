const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('./database');//aqui garante que a conexão com o banco de dados é estabelecida e que os modelos e associações são configurados antes de iniciar o servidor 

const app = express();

app.use(express.json());
app.use(cors()); // habilita o CORS
app.use(routes);

app.listen(3030);