import { ShiftType } from "./type";
import { updateShift, findShiftByUserId } from "./repository";
import { ApiError } from "../../config/Error";

const endShiftService = async ({ id, end_cash }: ShiftType) => {
  try {
    if (!id || !end_cash) throw new ApiError("Dados inválidos", null);

    const shiftExist = await findShiftByUserId(id);

    if (!shiftExist) throw new ApiError("Turno não encontrado", 404);

    const shift_id = shiftExist?.getDataValue("id");

    const end_time = new Date().toISOString();

    const is_opened = false;

    await updateShift({ id: shift_id, end_time, end_cash, is_opened });

    return { message: "Turno finalizado com sucesso" };
  } catch (error) {
    throw new ApiError("Erro ao finalizar turno", error);
  }
};

export { endShiftService };
