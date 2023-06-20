const Autor = require('../models/Autor');
const Projeto = require('../models/Projeto');

async function cadastrarProjeto(req, res) {
  const { area, titulo, resumo, dataEnvio } = req.body;

  try {
    const projeto = await Projeto.create({
      area,
      titulo,
      resumo,
      data_envio: dataEnvio, //obs: aqui eu digo que o atributo dataEnvio é do tipo data_envio
    });                       //pois no flutter a variavel tem que ser formatada assim: dataEnvio
    res.status(201).json({ projeto });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Erro ao cadastrar um projeto!' });
  }
}
  async function buscarProjetos(req, res){
    try {
      const projetos = await Projeto.findAll({
        include: {
          model: Autor,
          as: 'autores',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }
      });
      return res.status(200).json({ projetos });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível buscar os projetos.' });
    }
}
  

  async function buscarProjetoPorId(req, res, next){
    const { id } = req.params;
    
    try {
      const projeto = await Projeto.findByPk(id);
      
      if (!projeto) {
        throw createError(404, `Projeto com id ${id} não encontrado.`);
      }
      
      res.json(projeto);
    } catch (error) {
      next(error);
    }
  }

    async function  atualizarProjetoId(req, res, next) {
    const { id } = req.params;
    const { area, titulo, resumo, data_envio } = req.body;
    
    try {
      const projeto = await Projeto.findByPk(id);
      
      if (!projeto) {
        throw createError(404, `Projeto com id ${id} não encontrado.`);
      }
      
      await projeto.update({ area, titulo, resumo, data_envio });
      res.json(projeto);
    } catch (error) {
      next(error);
    }
  }

  async function deletarProjetoId(req, res) {
    const { id } = req.params;
    try {
      const projeto = await Projeto.findByPk(id);
      if (!projeto) {
        return res.status(404).json({ error: 'Projeto não encontrado' });
      }
      await projeto.destroy();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Não foi possível deletar o projeto' });
    }
  }
  // Rota para listar autores e projetos (Geral) na classe "Projeto" /projetos/autores
async function listarProjetosEAutores(req, res) {
  try {
    const projetos = await Projeto.findAll({
      include: {
        model: Autor,
        as: 'autores',
      },
    });

    return res.status(200).json(projetos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao obter autores e projetos.' });
  }
};
  module.exports = {
    cadastrarProjeto,
    buscarProjetos,
    buscarProjetoPorId,
    atualizarProjetoId,
    deletarProjetoId,
    //consultas
    listarProjetosEAutores,
  };