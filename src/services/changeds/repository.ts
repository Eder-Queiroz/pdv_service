import { ChangedType } from "./type";
import { Changed } from "../../model/changed";
import { Op } from "sequelize";

interface filterChangedsType {
  shift_id: number;
  start_time: string;
  end_time: string;
  limit: number;
  offset: number;
}

const createChanged = async (changed: ChangedType) => Changed.create(changed);

const findChangeds = async ({
  shift_id,
  start_time,
  end_time,
  limit,
  offset,
}: filterChangedsType) => {
  let where = {};

  if (shift_id) {
    where = { ...where, shift_id };
  }

  if (start_time && end_time) {
    where = {
      ...where,
      changed_time: {
        [Op.between]: [
          new Date(start_time).toISOString(),
          new Date(end_time).toISOString(),
        ],
      },
    };
  }

  return Changed.findAndCountAll({
    include: [
      {
        association: "shift",
        include: [{ association: "user", attributes: ["name"] }],
      },
    ],
    attributes: { exclude: ["shift_id"] },
    where,
    limit,
    offset,
    order: [["changed_time", "DESC"]],
  });
};

const findChangedByShiftId = async (shift_id: number) =>
  Changed.findAll({ where: { shift_id } });

export { createChanged, findChangeds, findChangedByShiftId };
