import { ShiftType } from "./type";
import { createShift, findShiftOpenedByUserId } from "./repository";
import { findUserById } from "../user/repository";
import { ApiError } from "../../config/Error";

const startShiftService = async ({ user_id, start_cash }: ShiftType) => {
  try {
    if (!user_id || !start_cash) throw new ApiError("Dados inválidos", null);

    const user = await findUserById(user_id);

    if (!user) throw new ApiError("Usuário não encontrado", null);

    const shiftOpened = await findShiftOpenedByUserId(user_id);

    if (shiftOpened) throw new ApiError("Usuário já possui turno aberto", null);

    const start_time = new Date().toISOString();

    const is_opened = true;

    const shift = await createShift({
      user_id,
      start_time,
      start_cash,
      is_opened,
    });

    return shift;
  } catch (error) {
    throw new ApiError("Erro ao iniciar turno", error);
  }
};

export { startShiftService };
