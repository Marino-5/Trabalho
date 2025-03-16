const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Usuário fictício (simulando um banco de dados)
const users = [
  { id: 1, username: 'admin', password: bcrypt.hashSync('senha123', 8) }
];

// Rota de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Senha inválida' });

  const token = jwt.sign({ id: user.id }, 'seu-segredo', { expiresIn: '1h' });
  res.status(200).json({ message: 'Login bem-sucedido', token });
});

module.exports = router;
