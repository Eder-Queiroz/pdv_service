import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";
import { Product } from "../product";
import { Shift } from "../shift";

class Sale extends Model {}
Sale.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: DataTypes.INTEGER,
    shift_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    sale_time: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "sales",
  }
);

Sale.belongsTo(Product, { constraints: true, foreignKey: "product_id" });
Sale.belongsTo(Shift, { constraints: true, foreignKey: "shift_id" });

export { Sale };
