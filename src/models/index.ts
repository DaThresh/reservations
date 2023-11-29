import { Sequelize } from 'sequelize';
import { Availability } from './Availability';
import { Provider } from './Provider';

export const initModels = async (sequelize: Sequelize) => {
  const models = [Provider, Availability];

  for (const Model of models) {
    Model.initModel(sequelize);

    // Below will adjust Schema for us
    // Remove for production use and handle with migrations
    await Model.sync();
  }
};

export { Availability, Provider };
