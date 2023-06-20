const Cronograma =require('../models/Cronograma');

async function cadastrarCronograma(req, res){
    const {data_inicio, descricao, data_fim} = req.body;
    try{
        const cronograma = await Cronograma.create({data_inicio, descricao, data_fim});
        return res.status(200).json(cronograma);
    }catch(error){
        return res.status(404).error('impossivel cadastrar cronograma') 
    }
}
//busca todos cronogramas
 async function bucarCronograma(req, res) {
    try {
      const cronograma = await Cronograma.findAll({
        include: {
          association: 'premios',
          attributes: ['id', 'descricao', 'valor'],
        },
        attributes: ['id', 'descricao', 'data_inicio', 'data_fim'],
      });
      return res.json(cronograma);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao buscar cronograma.' });
    }
  }
//buscar cronogramas pelo id /cronogramas/:id
async function buscarCronogramaId(req, res){
    try {
      const cronograma = await Cronograma.findByPk(req.params.id, {
        include: {
          association: 'premios',
          attributes: ['id', 'descricao', 'valor'],
        },
        attributes: ['id', 'descricao', 'data_inicio', 'data_fim'],
      });
      if (!cronograma) {
        return res.status(404).json({ error: 'Cronograma não encontrado.' });
      }
      return res.json(cronograma);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao buscar cronograma.' });
    }
  };
  
  //atualizar cronograma pelo id /cronogramas/:id
   async function atualizarCronogId(req, res) {
    try {
      const [updated] = await Cronograma.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedCronograma = await Cronograma.findByPk(req.params.id);
        return res.json(updatedCronograma);
      }
      return res.status(404).json({ error: 'Cronograma não encontrado.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao atualizar cronograma.' });
    }
  };
    
//deletar cronogramas  /cronogramas/:id
async function deletarCronogId(req, res) {
    try {
      const deleted = await Cronograma.destroy({ where: { id: req.params.id } });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Cronograma não encontrado.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Erro ao deletar um cronograma.' });
    }     
}

module.exports = {
    cadastrarCronograma, bucarCronograma,
     buscarCronogramaId,  atualizarCronogId,  
    deletarCronogId,
}