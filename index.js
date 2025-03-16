const express = require('express');
const bodyParser = require('body-parser');
const pacotesRoutes = require('./routes/pacotes');
const sequelize = require('./config/database');

const app = express();
app.use(bodyParser.json());

// Rotas
app.use('/api/pacotes', pacotesRoutes);

app.listen(3000, async () => {
  console.log('Servidor rodando na porta 3000');

  // Sincroniza o banco de dados com o modelo
  await sequelize.sync({ force: false }); // A opção 'force: false' não recria as tabelas, apenas as sincroniza
});
