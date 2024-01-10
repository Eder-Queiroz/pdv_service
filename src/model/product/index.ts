import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";
import { Category } from "../category";

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bar_code: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    unit: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "products",
  }
);

Product.belongsTo(Category, { constraints: true, foreignKey: "category_id" });

export { Product };
