import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';
import { primaryKeyAttributes } from './utilities';

export class Provider extends Model<
  InferAttributes<Provider>,
  InferCreationAttributes<Provider>
> {
  declare readonly id: CreationOptional<string>;
  declare name: string;

  private static attributes: ModelAttributes<
    Provider,
    InferAttributes<Provider>
  > = {
    id: { ...primaryKeyAttributes },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(this.attributes, {
      sequelize,
      timestamps: false,
      modelName: 'provider',
      tableName: 'providers',
    });
  };
}
