const Avaliador = require('../models/Avaliador');


    async function cadastrarAvaliador(req, res){
        const {name, email, cpf, telefone} = req.body;
        try{
        const avaliador = await Avaliador.create({name, email, cpf, telefone});
        console.log(res,"avaliador cadastrado com sucesso!!");
        return res.status(200).json(avaliador);
        
        }catch(error){
            console.error(error);
            return res.status(500).json({ error: 'Não foi possível cadastrar um avaliador.' });
        }
    };
//buscar avaliadores 
async function buscarTodosAvaliadores(req, res){
  try {
    const avaliadores = await Avaliador.findAll();
    res.status('200').json(avaliadores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o avaliador' });
  }
}
//buscar avaliador pelo id /avaliadores/:id
async function buscarAvaliadorId(req, res) {
     try {
      const avaliador = await Avaliador.findByPk(req.params.id, { include: ['avaliacoes'] });
        if (avaliador) {
          res.json(avaliador);
      } else {
       res.status(404).json({ message: 'Avaliador não encontrado' });
      }
     } catch (error) {
       console.error(error);
      res.status(500).json({ message: 'Erro ao buscar o avaliador' });
    }
};
//deletar um avaliador pelo id avaliadores/:id
async function deletarAvaliId(req, res) {
    try {
      const avaliador = await Avaliador.findByPk(req.params.id);
      if (avaliador) {
        await avaliador.destroy();
        res.json({ message: 'Avaliador removido com sucesso' });
      } else {
        res.status(404).json({ message: 'Avaliador não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover o avaliador' });
    }
  };
//atualizar avaliador pelo id /avaliadores/:id
async function atualizarAvaliadorId(req, res) {
    try {
      const avaliador = await Avaliador.findByPk(req.params.id);
      if (avaliador) {
        await avaliador.update(req.body);
        res.json(avaliador);
      } else {
        res.status(404).json({ message: 'Avaliador não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar o avaliador' });
    }
  };
    module.exports = {
        cadastrarAvaliador, 
        buscarTodosAvaliadores,
        buscarAvaliadorId,
        deletarAvaliId,
        atualizarAvaliadorId,
    }