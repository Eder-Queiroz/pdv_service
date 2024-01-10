import { ApiError } from "../../config/Error";
import { findShifts } from "./repository";
import { findChangedByShiftId } from "../changeds/repository";

const handleChangeds = async (id: number) => {
  const changeds = await findChangedByShiftId(id);

  const shiftChangeds: any = {
    reinforcement: 0,
    sangria: 0,
  };

  changeds.map((changed: any) => {
    if (id === changed.shift_id) {
      if (changed.value >= 0) {
        shiftChangeds.reinforcement += parseFloat(changed.value);
      } else {
        shiftChangeds.sangria += parseFloat(changed.value);
      }
    }
  });

  return shiftChangeds;
};

const findShiftsService = async ({
  user_id,
  start_time,
  end_time,
  is_opened,
  limit,
  offset,
}: any) => {
  try {
    const shifts = await findShifts({
      user_id,
      start_time,
      end_time,
      is_opened,
      limit,
      offset,
    });

    const { rows, count } = shifts;

    let shiftsWithChangeds: any[] = [];

    await Promise.all(
      rows.map(async (shift: any) => {
        const changeds = await handleChangeds(shift.id);

        shiftsWithChangeds.push({
          ...shift.dataValues,
          changeds,
        });
      })
    );

    return {
      count,
      rows: shiftsWithChangeds,
    };
  } catch (error) {
    throw new ApiError("Erro ao buscar turnos", error);
  }
};

export { findShiftsService };
