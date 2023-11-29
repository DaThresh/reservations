import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { ValidationError } from 'yup';
import { initModels } from './models';
import { createV1Router } from './routes/v1';
import { ApiError } from './utilities/ApiError';

export let sequelize: Sequelize;

(async () => {
  sequelize = new Sequelize({
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

  application.use(
    (error: unknown, _: Request, response: Response, __: NextFunction) => {
      console.error(error);
      if (error instanceof Error) {
        const status =
          error instanceof ApiError
            ? error.httpStatus
            : error instanceof ValidationError
            ? 400
            : 500;

        response.status(status).send({ message: error.message }).end();
      } else {
        response
          .status(500)
          .send({ message: 'An unknown error occurred' })
          .end();
      }
    }
  );

  application.listen(+(process.env.PORT ?? 8080), () => {
    console.log('Server is listening...');
  });
})();
