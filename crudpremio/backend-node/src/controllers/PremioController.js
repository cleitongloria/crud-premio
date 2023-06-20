const Premio = require('../models/Premio')

//cadastrar premios
async function cadastrarPremio(req, res){
    const {name, descricao, ano} = req.body;
    try{
    const premio = await Premio.create({name, descricao, ano});
    console.log(res,"premio  cadastrado com sucesso!!");
    return res.status(200).json(premio);
    
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Não foi possível cadastrar o premio.' });
    }
} 
//buscar premios pelo id /premios/:id
 async function buscarPremioId(req, res) {
    try {
      const premio = await Premio.findByPk(req.params.id, { include: ['cronograma', 'avaliacoes'] });
      if (premio) {
        res.json(premio);
      } else {
        res.status(404).json({ message: 'Premio não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar o premio' });
    }
  };
//deletar premio pelo id /premios/:id
async function deletarPremioId(req, res) {
    try {
      const premio = await Premio.findByPk(req.params.id);
      if (premio) {
        await premio.destroy();
        res.json({ message: 'Premio removido com sucesso' });
      } else {
        res.status(404).json({ message: 'Premio não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao remover o premio' });
    }
  };
//atualizar premio pelo id /premios/:id
async function atualizarPremioId(req, res) {
    try {
      const premio = await Premio.findByPk(req.params.id);
      if (premio) {
        await premio.update(req.body);
        res.json(premio);
      } else {
        res.status(404).json({ message: 'Premio não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar o premio' });
    }
  };

module.exports = {
    cadastrarPremio, 
    buscarPremioId, 
    deletarPremioId,
    atualizarPremioId,
}