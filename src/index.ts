import 'dotenv/config';
import express from 'express';
import { Sequelize } from 'sequelize';
import { initModels } from './models';
import { createV1Router } from './routes/v1';

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

  const application = express();
  application.use(express.json());

  const v1Router = createV1Router();
  application.use(v1Router);

  application.listen(+(process.env.PORT ?? 8080), () => {
    console.log('Server is listening...');
  });
})();
