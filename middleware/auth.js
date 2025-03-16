const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token de autenticação necessário' });
  }

  try {
    const user = jwt.verify(token, 'seu-segredo');
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = { isAuthenticated };
