const Autor = require('../models/Autor');
const Projeto = require('../models/Projeto');
//cadastrar autores
async function cadastrarAutor(req, res) {  
const { name, email, cpf, telefone } = req.body;
try {
console.log('Dados recebidos:', name, email, cpf, telefone);
const autor = await Autor.create({ name, email, cpf, telefone });
console.log('Autor cadastrado:', autor);
return res.status(201).json({ autor }); 
} 
catch (err) {   
console.error(err);
return res.status(500).json({ error: 'Não foi possível cadastrar o autor.' });
  }
}
// Buscar todos os autores
async function buscartodosAutores(req, res)  {
  try {
    const autores = await Autor.findAll();
    return res.json(autores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar autores' });
  }
};

// Buscar autor pelo ID busautores/:id
async function buscarAutorId(req, res) {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }
    return res.json(autor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar autor' });
  }
};

// Editar um autor autores/:id
 async function atualizarAutorId(req, res)  {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }
    await autor.update(req.body);
    return res.json(autor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar autor' });
  }
};

// Deletar um autor delautores/:id
async function deletarAutorId(req, res) {
  try {
    const autor = await Autor.findByPk(req.params.id);
    if (!autor) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }
    await autor.destroy();
    return res.json({ message: 'Autor deletado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao deletar autor' });
  }
};

async function associarAutorProjeto(req, res) {
  const { autorId } = req.params;
  const { projetoIds } = req.body;

  try {
    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      return res.status(404).json({ message: 'Autor não encontrado.' });
    }

    await autor.addProjetos(projetoIds);

    return res.status(200).json({ message: 'Projetos associados ao autor com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao associar projetos ao autor.' });
  }
}

// Obtenha todos os projetos associados a um autor
const buscaAutorProjetosAssoc = async (req, res) => {
  try {
    const { autorId } = req.params;
    const autor = await Autor.findByPk(autorId, {
      include: {
        model: Projeto,
        as: 'projetos',
        attributes: ['id', 'titulo', 'resumo', 'data_envio'],
        through: { attributes: [] }, // exclui o atributo 'AutorProjeto'
      },
    });
    res.status(200).json({ projetos: autor.projetos });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ocorreu um erro ao obter os projetos do autor.',
      error,
    });
  }
};

// Atualize um autor e seus projetos associados
const atualizarAutorAssoc = async (req, res) => {
  const { autorId } = req.params;
  const { name, email, cpf, telefone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Inicie uma transação para garantir a integridade dos dados
    await sequelize.transaction(async (t) => {
      // Atualize o autor
      const [numRows, [autor]] = await Autor.update(
        { name, email, cpf, telefone },
        { returning: true, where: { id: autorId }, transaction: t }
      );
      if (numRows === 0) {
        throw new Error(`Autor ${autorId} não encontrado.`);
      }
      // Atualize os projetos associados ao autor
      const projetos = req.body.projetos || [];
      await autor.setProjetos(projetos, { transaction: t });
    });
    res.status(200).json({
      message: `Autor ${autorId} atualizado com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Ocorreu um erro ao atualizar o autor ${autorId}.`,
      error,
    });
  }
};
//remover autores e projetos associados
async function removerAutorAssoc(req, res){
  try {
    const { autorId } = req.params;
    
    // Obtenha o autor com o ID informado
    const autor = await Autor.findByPk(autorId);

    // Verifique se o autor existe
    if (!autor) {
      return res.status(404).json({ message: 'Autor não encontrado.' });
    }

    // Remova todas as associações do autor com projetos
    await autor.removeProjetos();

    // Remova o autor do banco de dados
    await autor.destroy();

    res.status(200).json({
      message: `Autor ${autorId} removido com sucesso.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Ocorreu um erro ao remover o autor.',
      error,
    });
  }
};
//consultas 
// Rota para listar projetos e autores (Geral) na classe "Autor" /autores/projetos
async function listarAutoresEProjetos(req, res){
  try {
    const autores = await Autor.findAll({
      include: {
        model: Projeto,
        as: 'projetos',
      },
    });

    return res.status(200).json(autores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao obter projetos e autores.' });
  }
};

module.exports = {
  cadastrarAutor, buscartodosAutores,
  buscarAutorId,  atualizarAutorId,
  deletarAutorId, buscaAutorProjetosAssoc ,
  associarAutorProjeto,removerAutorAssoc, atualizarAutorAssoc,
  //consultas
  listarAutoresEProjetos,
};