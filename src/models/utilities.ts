import { DataTypes, ModelAttributeColumnOptions } from 'sequelize';

export const primaryKeyAttributes: ModelAttributeColumnOptions = {
  type: DataTypes.UUID,
  primaryKey: true,
  allowNull: false,
  defaultValue: DataTypes.UUIDV4,
};
