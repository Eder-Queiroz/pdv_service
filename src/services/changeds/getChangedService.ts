import { findChangeds } from "./repository";
import { ApiError } from "../../config/Error";

const getChangedService = async ({
  shift_id,
  start_time,
  end_time,
  limit,
  offset,
}: any) => {
  try {
    const changeds = await findChangeds({
      shift_id,
      start_time,
      end_time,
      limit,
      offset,
    });

    return changeds;
  } catch (error) {
    throw new ApiError("Erro ao buscar mudanças", error);
  }
};

export { getChangedService };
