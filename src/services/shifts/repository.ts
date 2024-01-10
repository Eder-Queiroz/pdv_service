import { ShiftType } from "./type";
import { Shift } from "../../model/shift";
import { Op } from "sequelize";

interface ShiftFilter {
  user_id: number;
  start_time: string;
  end_time: string;
  is_opened: boolean;
  limit: number;
  offset: number;
}

const createShift = async (shift: ShiftType) => Shift.create(shift);

const findShiftOpenedByUserId = async (user_id: number) =>
  Shift.findOne({ where: { user_id, is_opened: true } });

const findShiftByUserId = async (user_id: number) =>
  Shift.findOne({ where: { user_id, is_opened: true } });

const findShiftById = async (id: number) => Shift.findByPk(id);

const findShifts = async ({
  user_id,
  start_time,
  end_time,
  is_opened,
  limit,
  offset,
}: ShiftFilter) => {
  let where = {};

  if (user_id) where = { user_id };

  if (start_time && end_time)
    where = {
      ...where,
      start_time: {
        [Op.between]: [
          new Date(start_time).toISOString(),
          new Date(end_time).toISOString(),
        ],
      },
    };

  if (is_opened) where = { ...where, is_opened };

  return Shift.findAndCountAll({
    include: { association: "user", attributes: { exclude: ["password"] } },
    attributes: { exclude: ["user_id"] },
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

const updateShift = async (shift: ShiftType) =>
  Shift.update(shift, { where: { id: shift.id } });

export {
  createShift,
  findShiftOpenedByUserId,
  findShiftByUserId,
  findShiftById,
  findShifts,
  updateShift,
};
