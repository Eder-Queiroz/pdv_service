import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";
import { User } from "../user";

class Shift extends Model {}
Shift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    start_cash: DataTypes.DECIMAL,
    end_cash: DataTypes.DECIMAL,
    is_opened: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "shifts",
  }
);

Shift.belongsTo(User, { constraints: true, foreignKey: "user_id" });
export { Shift };
