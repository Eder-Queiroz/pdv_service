import { findShiftByUserId } from "./repository";
import { ApiError } from "../../config/Error";

const findShiftByUserIdService = async (userId: number) => {
  try {
    const shift = await findShiftByUserId(userId);

    if (!shift) {
      throw new ApiError("Shift not found", 404);
    }

    return shift;
  } catch (error) {
    throw new ApiError("Error ao buscar turno", error);
  }
};

export { findShiftByUserIdService };
