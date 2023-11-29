import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';
import { primaryKeyAttributes } from './utilities';

export class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare readonly id: string;
  declare providerId: string;
  declare requester: string;
  declare confirmed: boolean;
  declare datetime: Date;
  declare createdAt: Date;

  private static attributes: ModelAttributes<
    Appointment,
    InferAttributes<Appointment>
  > = {
    id: { ...primaryKeyAttributes },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    requester: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(),
    },
  };

  public static initModel = (sequelize: Sequelize) => {
    Appointment.init(this.attributes, {
      sequelize,
      timestamps: false,
      modelName: 'appointment',
      tableName: 'appointments',
    });
  };
}
