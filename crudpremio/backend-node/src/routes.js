const express = require('express');
const AutorController = require('./controllers/AutorController');
const AvaliadorController = require('./controllers/AvaliadorController');
const PremioController = require('./controllers/PremioController');
const ProjetoController = require('./controllers/ProjetoController');
const AvaliacaoController = require('./controllers/AvaliacaoController');
const CronogramaController = require('./controllers/CronogramaController');

const routes = express.Router();

//rotas projetos 
routes.post('/cdprojetos', ProjetoController.cadastrarProjeto);
routes.get('/projetos/bsc/todos', ProjetoController.buscarProjetos);
routes.get('/projetos/bsc/:id', ProjetoController.buscarProjetoPorId);
routes.put('/projetos/atulz/:id', ProjetoController.atualizarProjetoId);
routes.delete('/projetos/dlt/:id', ProjetoController.deletarProjetoId);
//consultas, 1º) listar autores e projetos
routes.get('/projetos/autores', ProjetoController.listarProjetosEAutores);
//rotas autor
routes.post('/autores', AutorController.cadastrarAutor);
routes.get('/autores/bsc/todos', AutorController.buscartodosAutores);
routes.get('/autores/bsc/:id', AutorController.buscarAutorId);
routes.put('/autores/atulz/:id', AutorController.atualizarAutorId);
routes.delete('/autores/dlt/:id', AutorController.deletarAutorId);
routes.post('/autores/:autorId/projetos', AutorController.associarAutorProjeto);
routes.get('/autores/:autorId/projetos', AutorController.buscaAutorProjetosAssoc)
//consultas, 1º) listar autores e projetos
routes.get('/autores/projetos', AutorController.listarAutoresEProjetos);

//rotas avaliador
routes.post('/avaliadores', AvaliadorController.cadastrarAvaliador);
routes.get('/avaliadores/bsc/todos', AvaliadorController.buscarTodosAvaliadores);
routes.get('/avaliadores/bsc/:id', AvaliadorController.buscarAvaliadorId);
routes.put('/avaliadores/atulz/:id', AvaliadorController.atualizarAvaliadorId);
routes.delete('/avaliadores/dlt/:id', AvaliadorController.deletarAvaliId);


//rotas premios 
routes.post('/cadpremios', PremioController.cadastrarPremio );
routes.get('/premios/bsc/:id', PremioController.buscarPremioId);
routes.put('/premios/atulz/:id', PremioController.atualizarPremioId);
routes.delete('/premios/dlt/:id', PremioController.deletarPremioId);

//rotas avaliação 
routes.post('/avaliacoes/premiar', AvaliacaoController.premiarProjeto);
routes.post('/cdavaliacoes', AvaliacaoController.cadastrarAvaliações);
routes.get('/avaliacoes/bsc/todos', AvaliacaoController.bucarAvaliacoes);
routes.get('/avaliacoes/bsc/:id', AvaliacaoController.bucarAvaliacaoId);
routes.put('/avaliacoes/atulz/:id', AvaliacaoController.atualizarAvaliacaoId);
routes.delete('/avaliacoes/dlt/:id', AvaliacaoController.deletarAvaliacaoId)
//rotas cronograma
routes.post('/cadcronogramas', CronogramaController.cadastrarCronograma);
routes.get('/cronogramas/bsc/todos', CronogramaController.bucarCronograma);
routes.get('/cronogramas/bsc/:id', CronogramaController.buscarCronogramaId);
routes.put('/cronogramas/atulz/:id', CronogramaController.atualizarCronogId);
routes.delete('/cronogramas/dlt/:id', CronogramaController.deletarCronogId);


module.exports = routes;