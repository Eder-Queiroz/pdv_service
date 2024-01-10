import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";

class Category extends Model {}
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "categories",
  }
);

export { Category };
