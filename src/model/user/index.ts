import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "users",
  }
);

export { User };
