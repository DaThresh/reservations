import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';
import { primaryKeyAttributes } from './utilities';

export class Availability extends Model<
  InferAttributes<Availability>,
  InferCreationAttributes<Availability>
> {
  declare readonly id: string;
  declare providerId: string;
  declare datetime: Date;

  private static attributes: ModelAttributes<
    Availability,
    InferAttributes<Availability>
  > = {
    id: { ...primaryKeyAttributes },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  };

  public static initModel = (sequelize: Sequelize) => {
    this.init(this.attributes, {
      sequelize,
      timestamps: false,
      modelName: 'availability',
      tableName: 'availabilities',
    });
  };
}
