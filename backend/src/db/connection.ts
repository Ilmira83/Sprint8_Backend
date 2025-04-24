  import { Sequelize } from 'sequelize';

  const sequelize = new Sequelize('greencamp', 'root', 'Dozhdibarov123*', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;