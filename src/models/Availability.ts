import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';
import { Provider } from './Provider';
import { primaryKeyAttributes } from './utilities';

export class Availability extends Model<
  InferAttributes<Availability>,
  InferCreationAttributes<Availability>
> {
  declare readonly id: CreationOptional<string>;
  declare providerId: string;
  declare datetime: Date;
  declare confirmed: boolean;
  declare requester: string | null;
  declare requestedAt: Date | null;

  private static attributes: ModelAttributes<
    Availability,
    InferAttributes<Availability>
  > = {
    id: { ...primaryKeyAttributes },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Provider },
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    requester: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: true,
      defaultValue: null,
    },
    requestedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
