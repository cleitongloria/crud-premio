const Avaliacao =require('../models/Avaliacao')
const Projeto = require('../models/Projeto');
const Premio = require('../models/Premio');
const Avaliador = require('../models/Avaliador');

//cadastrar avaliações  /avaliacoes
async function cadastrarAvaliações(req, res){
  try {
    const { parecer, nota, data_avaliacao, projeto_id, premio_id, avaliador_id } = req.body;

    const avaliacao = await Avaliacao.create({
      parecer,
      nota,
      data_avaliacao,
      projeto_id,
      premio_id,
      avaliador_id,
    });

    return res.status(201).json(avaliacao);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao cadastrar avaliação.' });
  }
};
//buscar avaliações 
async function bucarAvaliacoes(req, res) {
  try {
    const avaliacoes = await Avaliacao.findAll();
    return res.status(200).json(avaliacoes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar avaliações.' });
  }
};
//buscar avaliaçoes pelo id  /avaliacoes/:id
async function bucarAvaliacaoId(req, res) {
  try {
    const { id } = req.params;
    const avaliacao = await Avaliacao.findByPk(id);

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    return res.status(200).json(avaliacao);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar avaliação.' });
  }
};
//deletar avaliações 
async function deletarAvaliacaoId(req, res) {
  try {
    const { id } = req.params;
    const avaliacao = await Avaliacao.findByPk(id);

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    await avaliacao.destroy();
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar avaliação.' });
  }
};

//atualizar avaliações pelo id /avaliacoes/:id
async function atualizarAvaliacaoId(req, res){
  try {
    const { id } = req.params;
    const { parecer, nota, data_avaliacao, projeto_id, premio_id, avaliador_id } = req.body;

    let avaliacao = await Avaliacao.findByPk(id);

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada.' });
    }

    avaliacao = await avaliacao.update({
      parecer,
      nota,
      data_avaliacao,
      projeto_id,
      premio_id,
      avaliador_id,
    });

    return res.status(200).json(avaliacao);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar avaliação.' });
  }
};
async function premiarProjeto(req, res) {
    const { projeto_id, avaliador_id, premio_id, parecer, nota, data_avaliacao } = req.body;
    try {
      // Recupera a avaliação correspondente
      const avaliacao = await Avaliacao.findOne({ where: { projeto_id, avaliador_id } });
      if (!avaliacao) {
        return res.status(404).json({ error: 'A avaliação correspondente não foi encontrada.' });
      }
  
      // Verifica se a nota é maior ou igual a 7
      if (nota >= 7) {
        // Atualiza o registro com o id do prêmio, parecer, nota e data da avaliação
        const updatedAvaliacao = await avaliacao.update({ premio_id, parecer, nota, data_avaliacao });
        console.log('Projeto premiado com sucesso!');
        return res.status(200).json(updatedAvaliacao);
      } else {
        console.log('A nota é menor do que 7, o projeto não será premiado.');
        return res.status(400).json({ error: 'A nota é menor do que 7, o projeto não será premiado.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Não foi possível premiar o projeto.' });
    }
  }
  
  module.exports = {
    cadastrarAvaliações,  bucarAvaliacoes,
    bucarAvaliacaoId, atualizarAvaliacaoId, 
    deletarAvaliacaoId,
    premiarProjeto,
  }
  