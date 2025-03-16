const { Sequelize } = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize('viagem', 'root', 'senha', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
