import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/sequelize";
import { Shift } from "../shift";

class Changed extends Model {}
Changed.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    shift_id: DataTypes.INTEGER,
    value: DataTypes.DECIMAL,
    changed_time: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "changeds",
  }
);

Changed.belongsTo(Shift, { constraints: true, foreignKey: "shift_id" });

export { Changed };
