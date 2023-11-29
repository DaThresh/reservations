import 'dotenv/config';
import { Sequelize } from 'sequelize';
import { initModels } from './models';

(async () => {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: +(process.env.DATABASE_PORT ?? 3306),
    database: process.env.DATABASE_NAME ?? 'reservations',
    username: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD,
  });

  await sequelize.authenticate();
  await initModels(sequelize);
  console.log('Connected to the Database!');
})();
