import { ChangedType } from "./type";
import { createChanged } from "./repository";
import { findShiftById } from "../shifts/repository";
import { ApiError } from "../../config/Error";

const registerChangedService = async ({ shift_id, value }: ChangedType) => {
  try {
    if (!shift_id || !value) throw new ApiError("Dados inválidos", null);

    const shift = await findShiftById(shift_id);
    const is_opened = shift?.getDataValue("is_opened");

    if (!is_opened)
      throw new ApiError(
        "Não é possível registrar mudança em um turno fechado",
        null
      );

    const changed_time = new Date().toISOString();

    const changed = await createChanged({ shift_id, value, changed_time });

    return changed;
  } catch (error) {
    throw new ApiError("Erro ao registrar mudança", error);
  }
};

export { registerChangedService };
