const express = require('express');
const router = express.Router();
const PacoteViagem = require('../models/PacoteViagem');
const { isAuthenticated } = require('../middleware/auth');

// Rota pública: Consultar todos os pacotes de viagem
router.get('/', async (req, res) => {
  try {
    const pacotes = await PacoteViagem.findAll();
    res.status(200).json(pacotes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota privada: Criar pacote de viagem
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { nome, destino, descricao, data_inicio, data_fim, preco, imagem_url } = req.body;
    const pacote = await PacoteViagem.create({ nome, destino, descricao, data_inicio, data_fim, preco, imagem_url });
    res.status(201).json(pacote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota privada: Atualizar pacote de viagem
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const pacote = await PacoteViagem.findByPk(id);
    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }
    const { nome, destino, descricao, data_inicio, data_fim, preco, imagem_url } = req.body;
    pacote.nome = nome;
    pacote.destino = destino;
    pacote.descricao = descricao;
    pacote.data_inicio = data_inicio;
    pacote.data_fim = data_fim;
    pacote.preco = preco;
    pacote.imagem_url = imagem_url;
    await pacote.save();
    res.status(200).json(pacote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota privada: Deletar pacote de viagem
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const pacote = await PacoteViagem.findByPk(id);
    if (!pacote) {
      return res.status(404).json({ message: 'Pacote não encontrado' });
    }
    await pacote.destroy();
    res.status(200).json({ message: 'Pacote excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
